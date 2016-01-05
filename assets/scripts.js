/*
*  portfolio animations
*
*/

(function ($) {
	"use strict";

	$(document).ready(function () {

		var $divs = $('section.andrew-portfolio div');
		var $header = $('section.andrew-portfolio h1');

		$(window).scroll(function (){

			var scrollPos = $(window).scrollTop() + $(window).height() / 2;

			$divs.each(function() {

				var thisTop = $(this).offset().top;
				var thisBottom = $(this).offset().top + $(this).height();

				if (scrollPos >= thisTop && scrollPos <= thisBottom && this.className.indexOf('fixed-2') === -1) {
					
					$header.text(this.className.replace('-',' ').toUpperCase());

					$(this).siblings().css('margin-left', '');
					$(this).siblings().css('margin-top', '');
					$(this).siblings().css('margin-bottom', '');
					$(this).siblings().removeClass('fixed-2');

					$(this).css('margin-left', 0);
					$(this).css('margin-top', '');
					$(this).addClass('fixed-2');
					$(this).children('ul').css('margin-left', '5%');

					$(this).prev('div').css('margin-bottom', $(this).height());
					
				}

			});

			if (scrollPos > $(window).height() * 0.7) {
				$header.addClass('fixed-1');
			} else {
				$header.removeClass('fixed-1');
				$divs.removeClass('fixed-2');
			}

		});

	});

})(jQuery);