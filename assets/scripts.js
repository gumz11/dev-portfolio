/*
*  portfolio animations
*
*/

(function ($) {
    "use strict";

    $(document).ready(function () {

        var $divs   = $('section.andrew-portfolio div');
        var $header = $('section.andrew-portfolio h1');

        var height = $divs.height();
        var offset = $divs.eq(0).offset().top;

        $(window).scroll(function (){

            var scrollPos = $(window).scrollTop() + $(window).height() / 2;
            var index     = parseInt((scrollPos - offset) / height);

            var $current  = $divs.eq(index);

            if (!$current[0].className.includes('fixed-2')) {
                $header.text($current[0].className.replace('-',' ').toUpperCase());

                $current.siblings().removeClass('fixed-2');
                $current.siblings().css('margin-left', '');
                
                $current.css('margin-left', 0);
                $current.addClass('fixed-2');
                
                $current.children('ul').css('margin-left', '5%');
                $current.children('ul').children('li').css('margin-left', '5%');
            }

             if (scrollPos > $(window).height() * 0.8) {
                $header.addClass('fixed-1');
            } else {
                $header.removeClass('fixed-1');
                $current.removeClass('fixed-2');
            }

        });

    });

})(jQuery);