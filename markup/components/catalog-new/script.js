(function($) {
    "use strict";
    $(function() {
        if ($.fn.lazyload) {
            $(".b-actions-item__img span").lazyload();
        }
    });
})(jQuery);