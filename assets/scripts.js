/*
*  portfolio animations
*
*/

(function ($) {
	"use strict";

	$(document).ready(function () {

		var $divs = $('section.andrew-portfolio div');
		var $title = $('header.entry-header h1.entry-title');
		var $header = $('section.andrew-portfolio h1');

		$(window).scroll(function (){

			var scrollPos = $(window).scrollTop() + $(window).height() / 2;

			if (scrollPos > $(window).height() * 0.7) {
				$title.addClass('fixed-1');
				$header.addClass('fixed-2');
			} else {
				$title.removeClass('fixed-1');
				$header.removeClass('fixed-2');
			}

			$divs.each(function() {

				var thisTop = $(this).offset().top;
				var thisBottom = $(this).offset().top + $(this).height();

				if (scrollPos >= thisTop && scrollPos <= thisBottom && this.className.indexOf('fixed-3') === -1) {
					
					$header.text(this.className.replace('-',' ').toUpperCase());

					$(this).siblings().css('margin-left', '');
					$(this).siblings().css('margin-top', 0);
					$(this).siblings().removeClass('fixed-3');

					$(this).css('margin-left', 0);
					$(this).css('margin-top', '');
					$(this).addClass('fixed-3');

					$(this).next().css('margin-top', $(this).height());
				}

			});

		});

	});

})(jQuery);