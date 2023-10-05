( function($) {

  'use strict';
  
  $( function() {
    
    if ( $.fn.lazyload ) {
      $( '.b-actions-item__img span' ).lazyload();
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));