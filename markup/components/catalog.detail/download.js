Number.prototype.format = function() {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

(function($) {
    "use strict";
    $(function() {
        var percentage = 0;
        $(".b-catalog-detail__sizes-item").mouseenter(function() {
            var $item = $(this), cls = "", stl = "";
            if (!$item.data("qty")) return;
            if ($item.offset().top - 42 < $(window).scrollTop()) {
                cls += " i-bottom";
            }
            stl += ' style="margin-left: ' + (-75 - Math.max($item.offset().left + $item.width() / 2 + 75 + 10 - $(document).width(), 0)) + 'px;"';
            $item.append('<div class="b-catalog-detail__popup' + cls + '"><div' + stl + ">В наличии: " + $item.data("qty") + " шт.</div></div>");
        }).mouseleave(function() {
            $(this).find(".b-catalog-detail__popup").remove();
        });
        setTimeout(function() {
            if ($(window).height() > $(".b-catalog-detail__gallery").outerHeight() + 20) {
                $(".b-catalog-detail__gallery").addClass("i-sticky");
            }
        }, 2e3);
        if (window.matchMedia("(min-width: 1024px)").matches) {
            var fotoramaObj = $(".b-catalog-detail__gallery .fotorama").data("fotorama");
            if (fotoramaObj) {
                setTimeout(function() {
                    applyImagezoomsl(fotoramaObj);
                }, 200);
            } else {
                $(".b-catalog-detail__gallery .fotorama").on("fotorama:ready", function(e, fotorama) {
                    applyImagezoomsl(fotorama);
                });
            }
            $(".b-catalog-detail__gallery .fotorama").on("fotorama:showend", function(e, fotorama) {
                $(".magnifier, .cursorshade, .statusdiv, .tracker").remove();
                applyImagezoomsl(fotorama);
            });
        }
        function applyImagezoomsl(fotorama) {
            fotorama.activeFrame.$stageFrame.find("img").imagezoomsl({
                disablewheel: false
            });
            setTimeout(function() {
                var tracker = document.querySelector(".tracker");
                var width = parseInt(tracker.style.width);
                tracker.style.width = width - 53 * 2 + "px";
                tracker.style.pointerEvents = "auto";
            }, 200);
        }
        $(".b-catalog-element-gallery__thumbs-img").click(function() {
            var $img = $(this);
            $img.parent().find(".i-active").removeClass("i-active");
            $img.addClass("i-active");
            $(".b-catalog-element-gallery__main-img").fadeOut(300, function() {
                $(this).attr("src", $img.data("src")).attr("data-large", $img.data("large")).fadeIn(300);
            });
        });
        $(".b-catalog-detail__info").each(function() {
            var $info = $(this);
            var $price1 = $info.find(".b-catalog-detail__price[data-price=1]");
            var $price2 = $info.find(".b-catalog-detail__price[data-price=2]");
            var $price3 = $info.find(".b-catalog-detail__price[data-price=3]");
            var $price4 = $info.find(".b-catalog-detail__price[data-price=4]");
            var $order = $info.find(".b-catalog-detail__order");
            var $orderNum = $order.find(".b-catalog-detail__order-num");
            var $button = $info.find(".bj-cart-button");
            $info.delegate(".b-catalog-detail__sizes-item:not( .i-disabled )", "click", function() {
                var $item = $(this);
                $item.toggleClass("i-active");
                if ($item.hasClass("i-active")) {
                    $price1.text($item.data("price-1"));
                    $price2.text($item.data("price-2"));
                    $price3.text($item.data("price-3"));
                    $price4.text($item.data("price-4"));
                }
                var l = $info.find(".i-active").length;
                if (!l) {
                    $price1.text($info.data("price-1"));
                    $price2.text($info.data("price-2"));
                    $price3.text($info.data("price-3"));
                    $price4.text($info.data("price-4"));
                    $order.hide();
                    $button.addClass("i-disabled");
                } else {
                    $order.show();
                    $button.removeClass("i-disabled");
                    $orderNum.text(l + " " + sizeWord(l));
                }
            });
        });
        $(".bj-cart-button").click(function(e) {
            e.preventDefault();
            var $button = $(this);
            var url = $button.data("ajax-url");
            var data = {};
            data.id = [];
            data.price = $(".b-catalog-detail__prices :radio:checked").val();
            data.percentage = percentage;
            if ($button.hasClass("i-disabled")) {
                return;
            }
            $button.closest(".b-catalog-detail__info").find(".i-active").each(function() {
                data.id.push($(this).data("id"));
            });
            $.ajax({
                url: $button.data("ajax-url"),
                type: $button.data("ajax-method"),
                dataType: "json",
                data: data,
                success: function(data) {
                    if (data.STATUS && data.STATUS === "OK") {
                        if (data.NUM) {
                            $("#bx_cart_num").text(data.NUM);
                        }
                        var l = $button.closest(".b-catalog-detail__info").find(".i-active").length;
                        $("#cartModalLabelNum").text(l + " " + sizeWord(l));
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
        });
        $(".item-details-accordeon .collapsing-block").not(":first").addClass("closed");
        $(".item-details-accordeon .collapsing-block").on("click", ".h3", function() {
            $(this).parent(".collapsing-block").toggleClass("closed");
        });
    });
    function sizeWord(num) {
        if (/(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {
            return "размеров";
        } else if (/.*1$/.test(num)) {
            return "размер";
        } else if (/[2-4]$/.test(num)) {
            return "размера";
        } else {
            return "размеров";
        }
    }
})(jQuery);