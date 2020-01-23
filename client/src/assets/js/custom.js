$(function () {
    var current = location.pathname;
    $('#navigation li a').each(function () {
        var $this = $(this);
        // if the current path is like this link, make it active
        if ($this.attr('href').indexOf(current) !== -1) {
            $this.addClass('active');
        }
    })
})


/*============================================================
  fixed top on scroll about page 
============================================================*/

jQuery(function ($) {
    function fixDiv() {
        var $cache = $('#getFixedd');
        if ($(window).scrollTop() > 1800)
            $cache.css({
                'position': 'fixed',
                'top': '0px'
            });
        else
            $cache.css({
                'position': 'relative',
                'top': 'auto'
            });
    }
    $(window).scroll(fixDiv);
    fixDiv();
});


$(document).ready(function () {
/*
    $(".toggle-accordion").on("click", function () {
        var accordionId = $(this).attr("accordion-id"),
            numPanelOpen = $(accordionId + ' .collapse.in').length;

        $(this).toggleClass("active");

        if (numPanelOpen == 0) {
            openAllPanels(accordionId);
        } else {
            closeAllPanels(accordionId);
        }
    })

    openAllPanels = function (aId) {
        console.log("setAllPanelOpen");
        $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function (aId) {
        console.log("setAllPanelclose");
        $(aId + ' .panel-collapse.in').collapse('hide');
    }*/


    $( ".expand_btn" ).click(function() {
            $('.panel-collapse.collapse').addClass('in');
            $('.in').css({"height": "auto"});
            $(this).hide();
            $('.collapse_btn').show();
            $(".accordion-toggle").attr("aria-expanded","true");
        });
        
        $( ".collapse_btn" ).click(function() {
            $('.panel-collapse.collapse').removeClass('in');
            $(this).hide();
            $('.expand_btn').show();
            $(".accordion-toggle").attr("aria-expanded","false");
        });
        

});


/*============================================================
    .navbar-responsive
============================================================*/

(function ($) {
    $.fn.menumaker = function (options) {
        var cssmenu = $(this),
            settings = $.extend({
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function () {
            $(this).find(".button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function () {
                var mediasize = 1000;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);

(function ($) {
    $(document).ready(function () {
        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);

/*============================================================
    Faq
============================================================*/

//$('.collapse').on('shown.bs.collapse', function () {
//    $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
//}).on('hidden.bs.collapse', function () {
//    $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
//});


$(document).ready(function () {

    $(".toggle-accordion").on("click", function () {
        var accordionId = $(this).attr("accordion-id"),
            numPanelOpen = $(accordionId + ' .collapse.in').length;

        $(this).toggleClass("active");

        if (numPanelOpen == 0) {
            openAllPanels(accordionId);
        } else {
            closeAllPanels(accordionId);
        }
    })

    openAllPanels = function (aId) {
        console.log("setAllPanelOpen");
        $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function (aId) {
        console.log("setAllPanelclose");
        $(aId + ' .panel-collapse.in').collapse('hide');
    }

});


//    $(document).ready(function() {
//
//  $(".toggle-accordion").on("click", function() {
//    var accordionId = $(this).attr("accordion-id"),
//      numPanelOpen = $(accordionId + ' .collapse.in').length;
//    
//    $(this).toggleClass("active");
//
//    if (numPanelOpen == 0) {
//      openAllPanels(accordionId);
//    } else {
//      closeAllPanels(accordionId);
//    }
//  })
//
//  openAllPanels = function(aId) {
//    console.log("setAllPanelOpen");
//    $(aId + ' .panel-collapse:not(".in")').collapse('show');
//  }
//  closeAllPanels = function(aId) {
//    console.log("setAllPanelclose");
//    $(aId + ' .panel-collapse.in').collapse('hide');
//  }
//     
//});






/*============================================================
    scroll-top
============================================================*/


  
$(document).ready(function(){

$(function(){
 
    $(document).on( 'scroll', function(){
 
    	if ($(window).scrollTop() > 100) {
			$('.scroll-top-wrapper').addClass('show');
		} else {
			$('.scroll-top-wrapper').removeClass('show');
		}
	});
 
	$('.scroll-top-wrapper').on('click', scrollToTop);
});
 
function scrollToTop() {
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}

});


/*============================================================
   Pricing accrodian
============================================================*/


$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});



/*============================================================
   Account
============================================================*/

$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});

/*============================================================
   Tolltip
============================================================*/

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


/*============================================================
   Smoth scroll
============================================================*/

//document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//    anchor.addEventListener('click', function (e) {
//        e.preventDefault();
//
//        document.querySelector(this.getAttribute('href')).scrollIntoView({
//            behavior: 'smooth'
//        });
//    });
//});

$(document).ready(function () {
    var scrollLink = $('.scrolly');

    // Smooth scrolling
    scrollLink.click(function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset();

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })
    })
});


/*============================================================
  fixed top on scroll tradinational page 
============================================================*/

// jQuery(function($) {
//   function fixDiv() {
//     var $cache = $('#getFixed');
//     if ($(window).scrollTop() > 1350)
//       $cache.css({
//         'position': 'fixed',
//         'top': '0px'
//       });
//     else
//       $cache.css({
//         'position': 'relative',
//         'top': 'auto'
//       });
//   }
//   $(window).scroll(fixDiv);
//   fixDiv();
// });



/*============================================================
  fixed top on scroll tradinational page 
============================================================*/

(function ($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
            center: false,
            getWidthFrom: '',
            responsiveWidth: false
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function () {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;

                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css('position', '')
                            .css('top', '');
                        s.stickyElement.trigger('sticky-end', [s]).parent().removeClass(s.className);
                        s.currentTop = null;
                    }
                } else {
                    var newTop = documentHeight - s.stickyElement.outerHeight() -
                        s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop);

                        if (typeof s.getWidthFrom !== 'undefined') {
                            s.stickyElement.css('width', $(s.getWidthFrom).width());
                        }

                        s.stickyElement.trigger('sticky-start', [s]).parent().addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function () {
            windowHeight = $window.height();

            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i];
                if (typeof s.getWidthFrom !== 'undefined' && s.responsiveWidth === true) {
                    s.stickyElement.css('width', $(s.getWidthFrom).width());
                }
            }
        },
        methods = {
            init: function (options) {
                var o = $.extend({}, defaults, options);
                return this.each(function () {
                    var stickyElement = $(this);

                    var stickyId = stickyElement.attr('id');
                    var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName
                    var wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);

                    if (o.center) {
                        stickyElement.parent().css({
                            width: stickyElement.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        });
                    }

                    if (stickyElement.css("float") == "right") {
                        stickyElement.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        });
                    }

                    var stickyWrapper = stickyElement.parent();
                    stickyWrapper.css('height', stickyElement.outerHeight());
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        className: o.className,
                        getWidthFrom: o.getWidthFrom,
                        responsiveWidth: o.responsiveWidth
                    });
                });
            },
            update: scroller,
            unstick: function (options) {
                return this.each(function () {
                    var unstickyElement = $(this);

                    var removeIdx = -1;
                    for (var i = 0; i < sticked.length; i++) {
                        if (sticked[i].stickyElement.get(0) == unstickyElement.get(0)) {
                            removeIdx = i;
                        }
                    }
                    if (removeIdx != -1) {
                        sticked.splice(removeIdx, 1);
                        unstickyElement.unwrap();
                        unstickyElement.removeAttr('style');
                    }
                });
            }
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };

    $.fn.unstick = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.unstick.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }

    };
    $(function () {
        setTimeout(scroller, 0);
    });
})(jQuery);





$("#getFixed").sticky({
    topSpacing: 0
});

$('#nav').onePageNav({
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 1500,
    scrollThreshold: 0.5,
    filter: '',
    easing: 'easeInOutExpo'
});




/*============================================================
  fixed top on scroll tradinational page 
============================================================*/

//
//$(document).ready(function(){ 
//    $(window).scroll(function(){ 
//        if ($(this).scrollTop() > 100) { 
//            $('#scroll-top-button').fadeIn(); 
//        } else { 
//            $('#scroll-top-button').fadeOut(); 
//        } 
//    }); 
//    $('#scroll-top-button').click(function(){ 
//        $("html, body").animate({ scrollTop: 0 }, 600); 
//        return false; 
//    }); 
//});