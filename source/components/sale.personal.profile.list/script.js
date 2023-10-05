(function ($) {
  'use strict';

  $(function () {
    $('#profile-list a').click(function (e) {
      e.preventDefault();
    });
    $('#profile-list tr').click(function () {
      window.location = $(this).find('a').attr('href');
    });
  });
})(jQuery);
