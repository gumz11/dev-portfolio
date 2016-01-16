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

    var Portfolio = (function () {
        
        var $divs;
        var $header;
        var divHeight;
        var divsOffset;
        var scrollPos;

        function updateScroll() {
            scrollPos = $(window).scrollTop() + $(window).height() / 2;
        }

        function divsCheck() {
            var index = parseInt((scrollPos - divsOffset) / divHeight);
            var $current = $divs.eq(index);

            if ($current.length && !$current[0].className.includes('fixed-2')) {
                $header.text($current[0].className.replace('-',' ').toUpperCase());

                $current.siblings().removeClass('fixed-2');
                $current.siblings().css('margin-left', '');
                
                $current.css('margin-left', 0);
                $current.addClass('fixed-2');
                
                $current.children('ul').css('margin-left', '5%');
                $current.children('ul').children('li').css('margin-left', '5%');
            }

            if (scrollPos < divHeight) {
                $current.removeClass('fixed-2');
            } else if (scrollPos > $(document).height() - divHeight) {
                $divs.last().css('margin-top','-150%');
            } else {
                $divs.last().css('margin-top','');
            }
        }

        function headerCheck() {
            if (scrollPos < divHeight) {
                $header.removeClass('fixed-1');
            } else if (scrollPos > $(document).height() - divHeight) {
                $header.css('margin-top','-150%');
            } else {
                $header.addClass('fixed-1');
                $header.css('margin-top','');
            }
        }

        return {
            
            init: function() {
                $divs   = $('section.andrew-portfolio div');
                $header = $('section.andrew-portfolio h1.title');

                if ($divs.length) {
                    divHeight = $divs.height();
                    divsOffset = $divs.eq(0).offset().top;
                    return true;
                }
            },

            scroll: function() {
                updateScroll();
                divsCheck();
                headerCheck();
            }

        };

    })();

    $(document).ready(function () {

        if (Portfolio.init()) {
            $(window).scroll(Portfolio.scroll);
        }

    });

})(jQuery);