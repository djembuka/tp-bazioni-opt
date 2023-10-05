( function($) {

  'use strict';
  
  $( function() {
    
    //gallery
    if ( window.matchMedia( '(min-width: 1024px)' ).matches ) {
      //$( '.b-catalog-element-gallery__main-img' ).imagezoomsl();
    }        

    $( '.b-catalog-element-gallery__thumbs-img' ).click(function() {
        var $img = $( this );
        $img.parent().find( '.i-active' ).removeClass( 'i-active' );
        $img.addClass( 'i-active' );
        $( '.b-catalog-element-gallery__main-img' ).fadeOut( 300, function() {
          $( this ).attr( 'src', $img.data( 'src' )).attr( 'data-large', $img.data( 'large' )).fadeIn( 300 );
        });
    });
  
    $( '.b-catalog-detail__info' ).each( function() {
      
      var $info = $( this );
      var $price1 = $info.find( '.b-catalog-detail__price[data-price=1]' );
      var $price2 = $info.find( '.b-catalog-detail__price[data-price=2]' );
      var $price3 = $info.find( '.b-catalog-detail__price[data-price=3]' );
      var $price4 = $info.find( '.b-catalog-detail__price[data-price=4]' );
      var $order = $info.find( '.b-catalog-detail__order' );
      var $orderNum = $order.find( '.b-catalog-detail__order-num' );
      var $button = $info.find( '.bj-cart-button' );
    
      $info.delegate( '.b-catalog-detail__sizes-item:not( .i-disabled )', 'click', function() {
      
        var $item = $( this );
        
        //highlight the item
        $item.toggleClass( 'i-active' );
        
        //set price
        if ( $item.hasClass( 'i-active' )) {
          $price1.text( $item.data( 'price-1' ));
          $price2.text( $item.data( 'price-2' ));
          $price3.text( $item.data( 'price-3' ));
          $price4.text( $item.data( 'price-4' ));
        }
        
        var l = $info.find( '.i-active' ).length;
        
        //set default price
        if ( !l ) {
          $price1.text( $info.data( 'price-1' ));
          $price2.text( $info.data( 'price-2' ));
          $price3.text( $info.data( 'price-3' ));
          $price4.text( $info.data( 'price-4' ));
          //hide num
          $order.hide();
          //hide button
          $button.addClass( 'i-disabled' );
        } else {
          //show num
          $order.show();
          //show button
          $button.removeClass( 'i-disabled' );
          //set num
          $orderNum.text( l + ' ' + sizeWord( l ));
        }
        
      });
      
    });
    
    $( '.bj-cart-button' ).click( function(e) {
      e.preventDefault();
      
      var $button = $( this );
      var url = $button.data( 'ajax-url' );
      var data = {};
      data.id = [];
      data.price = $( '.b-catalog-detail__prices :radio:checked' ).val();
      
      if ( $button.hasClass( 'i-disabled' )) {
        return;
      }
      
      $button.closest( '.b-catalog-detail__info' ).find( '.i-active' ).each( function() {
        data.id.push( $( this ).data( 'id' ));
      });
      
      $.ajax({
        url: $button.data( 'ajax-url' ),
        type: $button.data( 'ajax-method' ),
        dataType: "json",
        data: data,
        success: function(data) {
          if ( data.STATUS && data.STATUS === 'OK' ) {
            
            //set num for the cart icon
            if ( data.NUM ) {
              $( '#bx_cart_num' ).text( data.NUM );
            }
            
            //show the dialog window
            var l = $button.closest( '.b-catalog-detail__info' ).find( '.i-active' ).length;
            $( '#cartModalLabelNum' ).text( l + ' ' + sizeWord( l ));
            
          }
        },
        error: function (a, b, c) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    });

    //collapse detailed info blocks
    $('.item-details-accordeon .collapsing-block').not(':first').addClass('closed');
    $('.item-details-accordeon .collapsing-block').on('click', '.h3', function() {
      $(this).parent('.collapsing-block').toggleClass('closed');
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
  
  function sizeWord( num ) {
    if ( /(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {return 'размеров';}
    else if (/.*1$/.test(num)) {return 'размер';}
    else if (/[2-4]$/.test(num)) {return 'размера';}
    else {return 'размеров';}
  }

}( jQuery ));