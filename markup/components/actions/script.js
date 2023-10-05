(function($) {
    "use strict";
    $(function() {
        if ($.fn.lazyload) {
            $(".b-actions-item__img span").lazyload();
        }
        $(".bj-catalogue-filter input[type='checkbox']").click(function() {
            $(this).closest(".checkbox").toggleClass("active");
        });
    });
})(jQuery);