<?php
/**
 * Template Name: Portfolio
 *
 * @package AndrewDevPortfolio
 * @subpackage AndrewDevPortfolio
 * @since 1.0.0
 */
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

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
						the_content();
					?>
					</section>
				</div>

				<?php
				// End of the loop.
			endwhile;
			?>

	</main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>