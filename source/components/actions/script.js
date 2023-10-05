( function($) {

  'use strict';
  
  $( function() {
    
    if ( $.fn.lazyload ) {
      $( '.b-actions-item__img span' ).lazyload();
    }
    
    //click on filter checkbox
    $(".bj-catalogue-filter input[type='checkbox']").click(function() {
      $(this).closest('.checkbox').toggleClass("active");
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));