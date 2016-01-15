<?php
/**
 * @package AndrewDevPortfolio
 */
/*
Plugin Name: Dev Portfolio
Plugin URI: http://ajgmez.com/
Description: A plugin for developer portfolios.
Version: 1.0.0
Author: Andrew Gomez
Author URI: http://ajgmez.com/
License: MIT
Text Domain: andrew-dev-portfolio
*/
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

define( 'ANDREWDEVPORTFOLIO_VERSION', '1.0.0' );
define( 'ANDREWDEVPORTFOLIO_MINIMUM_WP_VERSION', '3.4' );
define( 'ANDREWDEVPORTFOLIO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'ANDREWDEVPORTFOLIO_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

add_action("template_redirect", 'my_theme_redirect');
add_shortcode('andrew-contact-form', 'my_contact_form');

function my_init() {
    wp_enqueue_style('andrew-dev-portfolio', ANDREWDEVPORTFOLIO_PLUGIN_URL . 'style.min.css');
    wp_enqueue_script('andrew-dev-portfolio', ANDREWDEVPORTFOLIO_PLUGIN_URL . 'scripts.min.js', array('jquery'));
}

function my_theme_redirect() {
	global $wp;
	$plugindir = dirname( __FILE__ );

	if (isset($wp->query_vars["pagename"]) && $wp->query_vars["pagename"] == 'portfolio') {
        my_init();
		$templatefilename = 'page-portfolio.php';
		if (file_exists(ANDREWDEVPORTFOLIO_PLUGIN_DIR . '/templates/' . $templatefilename)) {
			$return_template = ANDREWDEVPORTFOLIO_PLUGIN_DIR . '/templates/' . $templatefilename;
			include($return_template);
            die();
		}
	}
}

function my_contact_form() {

    $content = "
        <form action=" . admin_url('admin-ajax.php') . " method='POST'>
        <input name='action' value='email_send' type='hidden'>
        <input name='name' type='text' placeholder='Name' />
        <input name='email' type='text' placeholder='Email' />
        <textarea name='message'></textarea>
        <input type='submit' value='Send Message' />
        </form>
    ";

    return $content;

}

add_action('wp_ajax_nopriv_email_send', 'process_email_send');

function process_email_send() {

    echo 'stuff';
    if (empty($_POST) || !wp_verify_nonce($_POST['_wpnonce'],'email_send')) {
        echo 'You targeted the right function, but sorry, your nonce did not verify.';
        die();
    } else {
        // do your function here 
        wp_redirect($redirect_url_for_non_ajax_request);
    }
}