(function($) {
    "use strict";
    $(function() {
        var swiper = new Swiper(".swiper-container", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            preloadImages: false,
            lazy: true,
            watchSlidesVisibility: true
        });
        ymaps.ready(function() {
            var shopDetailMap = new ymaps.Map("shopDetailMapID", {
                center: window.shopDetailMapCoords,
                zoom: window.shopDetailMapZoom || 9,
                controls: [ "typeSelector", "zoomControl" ]
            }, {
                typeSelectorFloat: "left",
                zoomControlSize: "small"
            }), shopDetailPlacemark = new ymaps.Placemark(shopDetailMap.getCenter(), {
                hintContent: "Собственный значок метки",
                balloonContent: "Это красивая метка"
            }, {
                iconLayout: "default#image",
                iconImageHref: window.shopDetailMapBalloonHref,
                iconImageSize: [ 43, 64 ],
                iconImageOffset: [ -22, -64 ]
            });
            shopDetailMap.geoObjects.add(shopDetailPlacemark);
            if (window.matchMedia("(max-width: 1024px)").matches) {
                shopDetailMap.behaviors.disable("drag");
            }
        });
    });
})(jQuery);