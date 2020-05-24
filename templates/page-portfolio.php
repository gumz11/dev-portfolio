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
                    <?php //the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                </header><!-- .entry-header -->

                <div class="entry-content">
                    <section class="andrew-nav-menu">
                    </section>
                    <section class="andrew-portfolio">
                    <?php
                        if (!$_POST) { ?>
                            <h1 class="title fixed-1"></h1>
                            <p class="portfolio-down"> <span class="down-arrow"></span> </p>
                            <?php the_content(); ?>
                            <p class="end"></p>
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

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>
<?php get_footer(); ?>
