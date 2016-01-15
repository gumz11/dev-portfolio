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

			if (scrollPos > $(window).height() * 0.8) {
				$header.addClass('fixed-1');
			} else {
				$header.removeClass('fixed-1');
				$divs.removeClass('fixed-2');
			}

			$divs.each(function() {

				var thisTop = $(this).offset().top;
				var thisBottom = $(this).offset().top + $(this).height();

				if (scrollPos > $(window).height() * 0.8 && scrollPos >= thisTop && 
					scrollPos <= thisBottom && this.className.indexOf('fixed-2') === -1) {
					
					$header.text(this.className.replace('-',' ').toUpperCase());

					$(this).siblings().css('margin-left', '');
					$(this).siblings().css('margin-top', '');
					$(this).siblings().css('margin-bottom', '');
					$(this).siblings().removeClass('fixed-2');

					$(this).css('margin-left', 0);
					$(this).css('margin-top', '');
					$(this).css('margin-bottom', '');
					$(this).addClass('fixed-2');
					$(this).children('ul').css('margin-left', '5%');
					$(this).children('ul').children('li').css('margin-left', '5%');

					if ($(this).prev('div').length) {
						$(this).prev('div').css('margin-bottom', $(this).height());
					} else {
						$(this).next('div').css('margin-top', $(this).height());
						$(this).next('div').next('div').css('margin-top', $(this).next('div').height());
						return false;
					}
					
				}

				if ($(this).next('div').length === 0 && 
					scrollPos > $(document).height() - $(window).height() / 2) {
					$(this).removeClass('fixed-2');
				}

			});

		});

	});

})(jQuery);