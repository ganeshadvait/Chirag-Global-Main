<?php
/**
 * Plugin Name: Chirag Site Sync
 * Description: When a blog post or event is published, updated, unpublished or deleted, tells GitHub to sync it to the main website (chiragglobalhospitals.com) straight away.
 * Version: 1.0.0
 * Requires PHP: 7.4
 *
 * Setup: add this line to wp-config.php, above "That's all, stop editing!":
 *
 *     define( 'CHIRAG_GITHUB_TOKEN', 'github_pat_...' );
 *
 * The token is a GitHub fine-grained personal access token with access to only the
 * ganeshadvait/Chirag-Global-Main repository and the permission "Contents: Read and write".
 *
 * GitHub then runs the "Sync blog & events" workflow (.github/workflows/sync-cms.yml), which
 * commits the new content to main, and the host rebuilds the site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const CHIRAG_SYNC_REPO       = 'ganeshadvait/Chirag-Global-Main';
const CHIRAG_SYNC_POST_TYPES = array( 'post', 'event' );

/** Asks GitHub to run the sync workflow. Returns true when GitHub accepted the request. */
function chirag_site_sync_trigger( $reason ) {
	if ( ! defined( 'CHIRAG_GITHUB_TOKEN' ) || ! CHIRAG_GITHUB_TOKEN ) {
		return false;
	}
	$response = wp_remote_post(
		'https://api.github.com/repos/' . CHIRAG_SYNC_REPO . '/dispatches',
		array(
			'timeout' => 10,
			'headers' => array(
				'Accept'               => 'application/vnd.github+json',
				'Authorization'        => 'Bearer ' . CHIRAG_GITHUB_TOKEN,
				'X-GitHub-Api-Version' => '2022-11-28',
				'User-Agent'           => 'chirag-site-sync',
			),
			'body'    => wp_json_encode(
				array(
					'event_type'     => 'cms-publish',
					'client_payload' => array( 'reason' => $reason ),
				)
			),
		)
	);
	$ok = ! is_wp_error( $response ) && 204 === wp_remote_retrieve_response_code( $response );
	update_option(
		'chirag_site_sync_last',
		array(
			'time'   => current_time( 'mysql' ),
			'reason' => $reason,
			'ok'     => $ok,
			'error'  => is_wp_error( $response ) ? $response->get_error_message() : wp_remote_retrieve_response_code( $response ),
		),
		false
	);
	return $ok;
}

/** Published, edited while published, or unpublished (draft, private, trash) */
add_action(
	'transition_post_status',
	function ( $new_status, $old_status, $post ) {
		if ( ! in_array( $post->post_type, CHIRAG_SYNC_POST_TYPES, true ) ) {
			return;
		}
		if ( wp_is_post_revision( $post ) || wp_is_post_autosave( $post ) ) {
			return;
		}
		if ( 'publish' !== $new_status && 'publish' !== $old_status ) {
			return;
		}
		chirag_site_sync_trigger( "{$post->post_type} {$post->post_name}: {$old_status} -> {$new_status}" );
	},
	10,
	3
);

/** Status, and a "Sync now" button, under Settings → Site Sync */
add_action(
	'admin_menu',
	function () {
		add_options_page( 'Site Sync', 'Site Sync', 'edit_posts', 'chirag-site-sync', 'chirag_site_sync_page' );
	}
);

function chirag_site_sync_page() {
	if ( isset( $_POST['chirag_sync_now'] ) && check_admin_referer( 'chirag_sync_now' ) ) {
		$ok = chirag_site_sync_trigger( 'manual sync' );
		echo '<div class="notice ' . ( $ok ? 'notice-success' : 'notice-error' ) . '"><p>' .
			esc_html( $ok ? 'Sync started. The website updates in a few minutes.' : 'GitHub did not accept the request. Check the token below.' ) .
			'</p></div>';
	}
	$last = get_option( 'chirag_site_sync_last' );
	echo '<div class="wrap"><h1>Site Sync</h1>';
	echo '<p>Publishing or updating a blog post or event sends it to chiragglobalhospitals.com automatically; the website updates a few minutes later.</p>';
	if ( ! defined( 'CHIRAG_GITHUB_TOKEN' ) || ! CHIRAG_GITHUB_TOKEN ) {
		echo '<p><strong>Not set up:</strong> add <code>define( \'CHIRAG_GITHUB_TOKEN\', \'…\' );</code> to wp-config.php.</p>';
	}
	if ( $last ) {
		printf(
			'<p>Last sync request: %s (%s) — %s</p>',
			esc_html( $last['time'] ),
			esc_html( $last['reason'] ),
			$last['ok'] ? 'accepted' : '<strong>failed: ' . esc_html( (string) $last['error'] ) . '</strong>'
		);
	}
	echo '<form method="post">';
	wp_nonce_field( 'chirag_sync_now' );
	echo '<p><button class="button button-primary" name="chirag_sync_now" value="1">Sync now</button></p></form></div>';
}
