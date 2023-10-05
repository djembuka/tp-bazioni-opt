( function($) {

  'use strict';
  
  $( function() {
    
    var $block = $( '.b-forms-letter' ),
        $form = $( '.b-forms-letter form' ),
        $response = $( '.b-forms-letter__response' ),
        $error = $( '.b-forms-letter__error' );
        
    $form.find( 'input[ data-required=true ], textarea[ data-required=true ]' ).blur( function() {
      var $formElement = $( this );
      
      //highlite this form element
      if ( $.trim( $formElement.val()) === '' ) {
        
        $formElement.addClass( 'i-invalid' );
        
      } else if ( $formElement.attr( 'id' ) === 'letterFormEmail' ) {
        
        var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        var mail = $formElement.val();
        if ( !mail.match( mailRegex )){
          $formElement.addClass( 'i-invalid' );
        }
        
      } else {
        $formElement.removeClass( 'i-invalid' );
      }
        
    }).focus( function() {
      $( this ).removeClass( 'i-invalid' );
      
    }).keyup( function() {
      
      var flag = true;
      
      //check all the form elements
      $form.find( 'input[ data-required=true ], textarea[ data-required=true ]' ).each( function( index, elem ) {
        if ( $.trim( $( elem ).val()) === '' ) {
          flag = false;
          
        } else if ( $( elem ).attr( 'id' ) === 'letterFormEmail' ) {
          
          var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
          var mail = $( elem ).val();
          if ( !mail.match( mailRegex )){
            flag = false;
          }
          
        }
      });
      
      //enable/disable the submit button
      if ( flag ) {
        $form.find( 'button[ type=submit ]' ).removeClass( 'btn-disabled' );
      } else {
        $form.find( 'button[ type=submit ]:not( .btn-disabled )' ).addClass( 'btn-disabled' );
      }
      
    });
    
    $( '.b-forms-letter form' ).submit( function(e) {
      e.preventDefault();
      
      var $form = $( this ), flag = true, $formsLetter = $form.closest( '.b-forms-letter' );
      
      $form.find( 'input[ data-required=true ], textarea[ data-required=true ]' ).each( function( index, elem ) {
        if ( $.trim( $( elem ).val()) === '' ) {
          
          $( elem ).addClass( 'i-invalid' );
          flag = false;
          
        } else if ( $( elem ).attr( 'id' ) === 'letterFormEmail' ) {
          
          var mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
          var mail = $( elem ).val();
          if ( !mail.match( mailRegex )){
            $( elem ).addClass( 'i-invalid' );
            flag = false;
          }
          
        } else {
          
          $( elem ).removeClass( 'i-invalid' );
          
        }
      });
      
      if ( !flag ) {
        return;
      }
      
      $.ajax({
        url: $form.attr( 'action' ),
        type: $form.attr( 'method' ),
        dataType: "json",
        data: $form.serialize(),
        success: function( data ) {
          
          if ( data && typeof data === 'object' && data.STATUS ) {
            if ( data.STATUS === 'Y' ) {
              $block.addClass( 'i-send' );
              setTimeout( function() {
                $block.addClass( 'i-success' );
              }, 300);
            } else if ( data.STATUS === 'N' ) {
              $error.show();
            }
          }
          
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    });
      
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
  
}( jQuery ));