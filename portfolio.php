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

add_action('init', 'my_init');
add_action("template_redirect", 'my_theme_redirect');


function my_init() {
	wp_enqueue_style('andrew-dev-portfolio', ANDREWDEVPORTFOLIO_PLUGIN_URL . 'style.min.css');
	wp_enqueue_script('andrew-dev-portfolio', ANDREWDEVPORTFOLIO_PLUGIN_URL . 'scripts.min.js', array('jquery'));
}

function my_theme_redirect() {
	global $wp;
	$plugindir = dirname( __FILE__ );

	if (isset($wp->query_vars["pagename"]) && $wp->query_vars["pagename"] == 'portfolio') {
		$templatefilename = 'page-portfolio.php';
		if (file_exists(ANDREWDEVPORTFOLIO_PLUGIN_DIR . '/templates/' . $templatefilename)) {
			$return_template = ANDREWDEVPORTFOLIO_PLUGIN_DIR . '/templates/' . $templatefilename;
			do_theme_redirect($return_template);
		}
	}
}

function do_theme_redirect($url) {
    global $post, $wp_query;
    if (have_posts()) {
        include($url);
        die();
    } else {
        $wp_query->is_404 = true;
    }
}