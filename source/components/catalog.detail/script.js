(function ($) {
  'use strict';

  $(function () {
    //not auth block
    $('.b-catalog-detail__not-auth .btn:eq(0)').click(function (e) {
      e.preventDefault();
      $('.b-catalog-detail__auth-reg').addClass('state2');
    });

    //sign in block
    var $form = $('.b-catalog-detail__reg form');
    var ajaxUrl = $form.attr('action');
    var ajaxMethod = $form.attr('method');
    var $textInput = $form.find('input[type=text]');
    var $passwordInput = $form.find('input[type=password]');

    //verify fields
    $form.submit(function (e) {
      e.preventDefault();
      var flag = true;
      //text
      if ($textInput.val() === '') {
        $textInput.addClass('i-invalid');
        flag = false;
      } else {
        $textInput.removeClass('i-invalid');
      }
      //password
      if ($passwordInput.val() === '') {
        $passwordInput.addClass('i-invalid');
        flag = false;
      } else {
        $passwordInput.removeClass('i-invalid');
      }

      if (flag) {
        //fetch data
        $.ajax({
          url: ajaxUrl,
          type: ajaxMethod, //GET
          dataType: 'html',
          data: $form.serialize(),
          success: function (html) {
            $('#catalogDetailNotAuth').hide();
            $('#catalogDetailWrap').html(html);
          },
          error: function (a, b, c) {
            if (window.console) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          },
        });
      }
    });
  });
})(jQuery);
