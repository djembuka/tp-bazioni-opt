(function($) {
    $(function() {
        var copyToClipboard = function(str, elem) {
            if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                str = str.trim();
                navigator.clipboard.writeText(str);
                if (elem) {
                    var span = document.createElement("span");
                    span.classList.add("b-copy-icon__note");
                    span.innerText = "Скопировано в буфер";
                    elem.appendChild(span);
                    setTimeout(function() {
                        span.classList.add("b-copy-icon__note--show");
                    }, 0);
                    setTimeout(function() {
                        span.classList.remove("b-copy-icon__note--show");
                    }, 1e3);
                    setTimeout(function() {
                        span.remove();
                    }, 1500);
                }
                return;
            }
            return Promise.reject("The Clipboard API is not available.");
        };
        if (window.matchMedia("(min-width: 768px)").matches) {
            document.querySelectorAll(".b-copy-icon").forEach(function(icon) {
                icon.addEventListener("click", function() {
                    var elem = icon.parentNode.querySelector("b");
                    if (!elem) {
                        elem = icon.parentNode;
                    }
                    copyToClipboard(elem.textContent, icon);
                });
            });
        }
        $(".b-catalog-detail__not-auth .btn:eq(0)").click(function(e) {
            e.preventDefault();
            $(".b-catalog-detail__auth-reg").addClass("state2");
        });
        var $form = $(".b-catalog-detail__reg form");
        var ajaxUrl = $form.attr("action");
        var ajaxMethod = $form.attr("method");
        var $textInput = $form.find("input[type=text]");
        var $passwordInput = $form.find("input[type=password]");
        $form.submit(function(e) {
            e.preventDefault();
            var flag = true;
            if ($textInput.val() === "") {
                $textInput.addClass("i-invalid");
                flag = false;
            } else {
                $textInput.removeClass("i-invalid");
            }
            if ($passwordInput.val() === "") {
                $passwordInput.addClass("i-invalid");
                flag = false;
            } else {
                $passwordInput.removeClass("i-invalid");
            }
            if (flag) {
                $.ajax({
                    url: ajaxUrl,
                    type: ajaxMethod,
                    dataType: "html",
                    data: $form.serialize(),
                    success: function(html) {
                        $("#catalogDetailNotAuth").hide();
                        $("#catalogDetailWrap").html(html);
                    },
                    error: function(a, b, c) {
                        if (window.console) {
                            console.log(a);
                            console.log(b);
                            console.log(c);
                        }
                    }
                });
            }
        });
    });
})(jQuery);