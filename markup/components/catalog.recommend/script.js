(function($) {
    "use strict";
    $(function() {
        setTimeout(function() {
            $(".b-catalog-recommend").addClass("i-show");
        }, 500);
        $(".b-catalog-recommend__gallery").each(function() {
            var $gallery = $(this), $container = $gallery.find(".swiper-container");
            var slidesPerView = 2;
            if (window.matchMedia("(min-width: 768px)").matches) {
                slidesPerView = $gallery.data("slidesperview");
            } else if (window.matchMedia("(min-width: 400px)").matches) {
                slidesPerView = 3;
            }
            var swiper = new Swiper($container, {
                slidesPerView: slidesPerView,
                spaceBetween: 20,
                navigation: {
                    nextEl: $gallery.find(".swiper-button-next"),
                    prevEl: $gallery.find(".swiper-button-prev")
                },
                lazy: true
            });
        });
    });
})(jQuery);