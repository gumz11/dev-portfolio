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
        var $nav;
        var $current;
        var scrollPos;

        var $down;
        var downInterval;

        function animate($c) {
            $c.css('margin-left', '0');
            $c.children('ul').css('margin-left', '5%');
            $c.children('ul').children('li').css('margin-left', '5%');
        }

        function updateScroll() {
            scrollPos = $(window).scrollTop() + $(window).height() * 0.5;
        }

        function divChanged() {
            var $div;

            if (scrollPos >= $divs.last().offset().top + $divs.last().height()) { 
                $div = 'end';
            } else if (scrollPos <= $divs.first().offset().top) {
                $div = 'start';
            } else {
                $div = $($divs.get().reverse().find(function(d) { 
                    return $(d).offset().top < scrollPos; 
                }));
            }

            if ($current === $div || $($current).is($div)) {
                return false;
            }

            $current = $div;
            if ($($current).length) {
                animate($current);
                clearInterval(downInterval);
                $down.css('display', 'none');
            }
            return true;
        }

        function headerCheck() {
            if ($current === 'start') {
                $header.css('display', 'none');
            } else if ($current === 'end') {
                $header.css('margin-top','-250%');
            } else {
                $header.text($current[0].className.replace(/-/g,' ').toUpperCase());
                $header.css('display','');
                $header.css('margin-top','');
            }
        }

        function navCheck() {
            var $navDivs = $('section.andrew-nav-menu div.point');

            $navDivs.removeClass('point-hover');
            if ($($current).length) {
                $nav.addClass('andrew-fixed');
                var i = $divs.get().findIndex(function(d) { return $current.is(d); });
                $navDivs.eq(i).addClass('point-hover');
            } else {
                $nav.removeClass('andrew-fixed');
            }
        }

        return {

            init: function() {
                $divs   = $('section.andrew-portfolio div');
                $header = $('section.andrew-portfolio h1.title');
                $nav    = $('section.andrew-nav-menu');
                $down   = $('p.portfolio-down');

                if (!downInterval) {
                    $down.pos = -25;
                    downInterval = setInterval(function() {
                        $down.pos *= -1;
                        $down.css('margin-top', $down.pos);
                    }, 600);
                }

                return $divs.length > 0;
            },

            scroll: function() {
                updateScroll();
                if (divChanged()) {
                    headerCheck();
                    navCheck();
                }
            },

            loadNavigation: function() {
                var className = '';
                var count = 0;

                $divs.each(function () {
                    var div = document.createElement('div');

                    if (className !== this.className) {
                        div.textContent = this.className.replace('-',' ').toUpperCase();
                        div.className = 'pipe';
                        div.id = count;
                        className = this.className;

                        $(div).click(Portfolio.scrollTo);
                        $nav[0].appendChild(div);

                        div = document.createElement('div');
                        div.className = 'point';
                        div.id = count++;
                    } else {
                        div.className = 'point';
                        div.id = count++;
                    }
                    $(div).click(Portfolio.scrollTo);
                    $nav[0].appendChild(div);
                });
            },

            scrollTo: function() {
                var top = $divs.eq(this.id).offset().top - $(window).height() * 0.25;

                $('html, body').animate({
                    scrollTop: top
                }, 200);
            }

        };

    })();

    $(document).ready(function () {

        if (Portfolio.init()) {
            Portfolio.loadNavigation();
            Portfolio.scroll();

            $(window).scroll(Portfolio.scroll);
            $(window).resize(function () {
                if (Portfolio.init()) {
                    Portfolio.scroll();
                }
            });
        }

    });

})(jQuery);
