(function($) {
    "use strict";
    $(function() {
        var $block = $(".b-forms-letter"), $form = $(".b-forms-letter form"), $response = $(".b-forms-letter__response"), $error = $(".b-forms-letter__error");
        $form.find("input[ data-required=true ], textarea[ data-required=true ]").blur(function() {
            var $formElement = $(this);
            if ($.trim($formElement.val()) === "") {
                $formElement.addClass("i-invalid");
            } else if ($formElement.attr("type") === "email") {
                var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
                var mail = $formElement.val();
                if (!mail.match(mailRegex)) {
                    $formElement.addClass("i-invalid");
                }
            } else {
                $formElement.removeClass("i-invalid");
            }
        }).focus(function() {
            $(this).removeClass("i-invalid");
        }).keyup(function() {
            var flag = true;
            $form.find("input[ data-required=true ], textarea[ data-required=true ]").each(function(index, elem) {
                if ($.trim($(elem).val()) === "") {
                    flag = false;
                } else if ($(elem).attr("type") === "email") {
                    var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
                    var mail = $(elem).val();
                    if (!mail.match(mailRegex)) {
                        flag = false;
                    }
                }
            });
            if (flag) {
                $form.find("[ type=submit ]").removeClass("btn-disabled");
            } else {
                $form.find("[ type=submit ]:not( .btn-disabled )").addClass("btn-disabled");
            }
        });
        $(".b-forms-letter form").submit(function(e) {
            var $form = $(this), flag = true, $formsLetter = $form.closest(".b-forms-letter");
            $form.find("input[ data-required=true ], textarea[ data-required=true ]").each(function(index, elem) {
                if ($.trim($(elem).val()) === "") {
                    $(elem).addClass("i-invalid");
                    flag = false;
                } else if ($(elem).attr("type") === "email") {
                    var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
                    var mail = $(elem).val();
                    if (!mail.match(mailRegex)) {
                        $(elem).addClass("i-invalid");
                        flag = false;
                    }
                } else {
                    $(elem).removeClass("i-invalid");
                }
            });
            if (!flag) {
                e.preventDefault();
                return false;
            }
        });
    });
})(jQuery);