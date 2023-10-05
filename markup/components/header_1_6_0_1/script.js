(function($) {
    "use strict";
    $(function() {
        setTimeout(function() {
            $(".bj-page-header__submenu").addClass("i-animate");
        }, 500);
        var menuItems = 0;
        $(".bj-page-header__submenu .swiper-wrapper a").each(function() {
            menuItems += $(this).width();
        });
        var menuItemWidth = menuItems / $(".bj-page-header__submenu .swiper-wrapper a").length;
        if ($(".bj-page-header__submenu .swiper-container").width() < ($(".bj-page-header__submenu .swiper-wrapper a").length - 1) * 30 + menuItems) {
            var swiper = new Swiper(".bj-page-header__submenu .swiper-container", {
                slidesPerView: Math.round($(".bj-page-header__submenu .swiper-container").width() * 10 / (menuItemWidth + 30)) / 10,
                spaceBetween: 30,
                freeMode: true
            });
        }
        $("#nav-button-xs").sideNav();
        $("#nav-button").click(function(e) {
            e.preventDefault();
            $(".bj-page-header__sub").slideToggle();
        });
        $(".bj-page-header__menu-link").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $link = $(this);
            $(".bj-page-header__sub").slideUp();
            $("#nav-button-xs").sideNav("hide");
            $(".bj-page-header__user-dropdown article").slideUp().removeClass("i-animate");
            if ($(".bj-page-header__dropdown article").is(":visible")) {
                if ($(".bj-page-header [id*=" + $(this).data("category") + "]").is(":visible")) {
                    $(".bj-page-header__dropdown article:visible").slideUp().removeClass("i-animate");
                } else {
                    $(".bj-page-header__dropdown article").removeClass("i-animate");
                    setTimeout(function() {
                        $(".bj-page-header [id*=cat_]").hide();
                        $(".bj-page-header [id*=" + $link.data("category") + "]").show();
                        setTimeout(function() {
                            $(".bj-page-header__dropdown article").addClass("i-animate");
                        }, 100);
                    }, 200);
                }
            } else {
                $(".bj-page-header [id*=cat_]").hide();
                $(".bj-page-header [id*=" + $link.data("category") + "]").show();
                $(".bj-page-header__dropdown article").slideDown().addClass("i-animate");
            }
            if (window.cartDropdownFlag) {
                window.cartDropdownFlag = false;
                setTimeout(function() {
                    if (!window.cartDropdownFlag) {
                        $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        $("#cartDropdown").removeClass("i-loaded");
                    }
                }, 100);
            }
        });
        $(".bj-page-header__dropdown article").click(function(e) {
            e.stopPropagation();
        });
        $(".bj-page-header__dropdown .up").click(function(e) {
            $(this).closest("article").slideUp().removeClass("i-animate");
            e.preventDefault();
        });
        $(".bj-personal-icon").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".bj-page-header__sub").slideUp();
            $("#nav-button-xs").sideNav("hide");
            $(".bj-page-header__dropdown article:visible").slideUp().removeClass("i-animate");
            $(".bj-page-header__user-dropdown article").slideToggle().toggleClass("i-animate");
            if (window.cartDropdownFlag) {
                window.cartDropdownFlag = false;
                setTimeout(function() {
                    if (!window.cartDropdownFlag) {
                        $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        $("#cartDropdown").removeClass("i-loaded");
                    }
                }, 100);
            }
        });
        if (!$("html").hasClass("bx-touch")) {
            $(".bj-cart-icon").click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (!window.cartDropdownFlag) {
                    window.cartDropdownFlag = true;
                    $(".bj-page-header__sub").slideUp();
                    $("#nav-button-xs").sideNav("hide");
                    $(".bj-page-header__dropdown article:visible").slideUp().removeClass("i-animate");
                    $(".bj-page-header__user-dropdown article").slideUp().removeClass("i-animate");
                    $(".bj-page-header__cart-dropdown article").slideDown();
                    setTimeout(function() {
                        $(".bj-page-header__cart-dropdown article").addClass("i-animate");
                    }, 100);
                    $.ajax({
                        url: $("#cartDropdown").data("url"),
                        type: $("#cartDropdown").data("method"),
                        dataType: "html",
                        success: function(html) {
                            if (html) {
                                $("#cartDropdown .container-fluid").html(html);
                                setTimeout(function() {
                                    $("#cartDropdown").addClass("i-loaded");
                                }, 100);
                            }
                        },
                        error: function(a, b, c) {
                            if (window.console) {
                                console.log(a);
                                console.log(b);
                                console.log(c);
                            }
                        }
                    });
                } else {
                    window.cartDropdownFlag = false;
                    setTimeout(function() {
                        if (!window.cartDropdownFlag) {
                            $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        }
                    }, 100);
                    setTimeout(function() {
                        if (!window.cartDropdownFlag) {
                            $("#cartDropdown").removeClass("i-loaded");
                        }
                    }, 500);
                }
            });
        } else {
            $(".bj-cart-icon").click(function(e) {
                e.stopPropagation();
            });
        }
        $(document).bind("click", function(e) {
            $(".bj-page-header__dropdown article").slideUp().removeClass("i-animate");
            $(".bj-page-header__user-dropdown article").slideUp().removeClass("i-animate");
            if (window.cartDropdownFlag && !$(e.target).closest("#cartDropdown").length) {
                window.cartDropdownFlag = false;
                setTimeout(function() {
                    if (!window.cartDropdownFlag) {
                        $(".bj-page-header__cart-dropdown article").slideUp().removeClass("i-animate");
                        $("#cartDropdown").removeClass("i-loaded");
                    }
                }, 100);
            }
        });
    });
})(jQuery);