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

namespace AndrewDevPortfolio\Plugin;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class Portfolio {

    private static function my_init() {
        wp_enqueue_style('andrew-dev-portfolio', plugin_dir_url(__FILE__) . 'style.min.css');
        wp_enqueue_script('andrew-dev-portfolio', plugin_dir_url(__FILE__) . 'scripts.min.js', array('jquery'));
    }

    private static function mail_send($from, $email, $message) {
        $to = get_option('admin_email');
        $subject = "A message on your Portfolio from: " . $from;
        $message = $message;
        $headers[] = 'From: ' . $from . ' <' . $email . '>';

        wp_mail( $to, $subject, $message, $headers );
    }

    public static function my_theme_redirect() {
        global $wp;

        if (isset($wp->query_vars["pagename"]) && $wp->query_vars["pagename"] == 'portfolio') {
            self::my_init();
            $templatefilename = 'page-portfolio.php';
            if (file_exists(plugin_dir_path(__FILE__) . '/templates/' . $templatefilename)) {
                $return_template = plugin_dir_path(__FILE__) . '/templates/' . $templatefilename;
                include($return_template);
                die();
            }
        }
    }

    public static function verify_post() {
        if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'email_send')) {
            print 'Nonce problem';
        } else if (!isset($_POST['from']) || !isset($_POST['email']) || !isset($_POST['message'])) {
            print 'Please fill in all the form fields.';
        } else if (!isset($_POST['human']) || $_POST['human'] != 4) {
            print 'You are not human or bad at math.';
        } else if (!isset($_POST['action']) || $_POST['action'] != 'email_send') {
            print 'Could not verify action.';
        } else {
            self::mail_send($_POST['from'], $_POST['email'], $_POST['message']);
            print '<h2> Thanks for the message! </h2>';
        }
    }

}

add_action("template_redirect", Array( __NAMESPACE__ . '\Portfolio', 'my_theme_redirect'));