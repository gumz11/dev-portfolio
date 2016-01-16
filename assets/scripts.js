/*
*  portfolio animations
*
*/

(function ($) {
    "use strict";

    if (!String.prototype.includes) {
      String.prototype.includes = function() {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
      };
    }

    $(document).ready(function () {

        var $divs   = $('section.andrew-portfolio div');
        var $header = $('section.andrew-portfolio h1.title');

        if ($divs.length) {
            var height = $divs.height();
            var offset = $divs.eq(0).offset().top;

            $(window).scroll(function (){

                var scrollPos = $(window).scrollTop() + $(window).height() / 2;
                var index     = parseInt((scrollPos - offset) / height);

                var $current  = $divs.eq(index);

                if ($current.length && !$current[0].className.includes('fixed-2')) {
                    $header.text($current[0].className.replace('-',' ').toUpperCase());

                    $current.siblings().removeClass('fixed-2');
                    $current.siblings().css('margin-left', '');
                    
                    $current.css('margin-left', 0);
                    $current.addClass('fixed-2');
                    
                    $current.children('ul').css('margin-left', '5%');
                    $current.children('ul').children('li').css('margin-left', '5%');
                }

                if (scrollPos < height) {
                    $header.removeClass('fixed-1');
                    $current.removeClass('fixed-2');
                } else if (scrollPos > $(document).height() - height) {
                    $header.css('margin-top','-150%');
                    $divs.last().css('margin-top','-150%');
                } else {
                    $header.addClass('fixed-1');
                    $header.css('margin-top','');
                    $divs.last().css('margin-top','');
                }

            });
        }

    });

})(jQuery);