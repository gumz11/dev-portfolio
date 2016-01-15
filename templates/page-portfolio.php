<?php
/**
 * Template Name: Portfolio
 *
 * @package AndrewDevPortfolio
 * @subpackage AndrewDevPortfolio
 * @since 1.0.0
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

            <?php
            // Start the loop.
            while ( have_posts() ) : the_post();

                // Include the page content ?>
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                </header><!-- .entry-header -->

                <div class="entry-content">
                    <section class="andrew-portfolio">
                    <?php
                        if (!$_POST) {
                            the_content(); ?>
                            <h4> Contact: </h4>
                            <form action="<?php echo the_permalink(); ?>" method='POST'>
                            <input name='action' value='email_send' type='hidden'>
                            <input name='from' type='text' placeholder='Name' required/>
                            <input name='email' type='email' placeholder='Email' required/>
                            <textarea name='message' required></textarea>
                            <br>
                            <input class='digit' name='human' type='text' placeholder='0' /> + 2 = 6
                            <input type='submit' value='Send Message' />
                            <?php wp_nonce_field('email_send'); ?>
                            </form>
                        <?php } else {
                            AndrewDevPortfolio\Plugin\Portfolio::verify_post();
                        } ?>
                    </section>
                </div>

                <?php
                // End of the loop.
            endwhile;
            ?>

    </main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>