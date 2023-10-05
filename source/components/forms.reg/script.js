( function($) {

  'use strict';
  
  $( function() {
    
    const formElements = [];
    
    document.querySelectorAll( '.bx_registration_page form [ name ]' ).forEach( function( elem ) {
      const name = elem.getAttribute( 'name' );
      if ( elem.tagName !== 'BUTTON' && elem.getAttribute( 'type' ) !== 'submit' && String( name ).toLowerCase().search( 'password' ) === -1 && String( name ).toLowerCase().search( 'captcha' ) === -1 ) {
        formElements.push( elem );
      }
    });
    
    setFormValues();
    
    formElements.forEach( function( elem ) {
      elem.addEventListener( 'keyup', function() {
        rememberFormValues();
      });
    });
    
    function rememberFormValues() {
      if ( !storageAvailable( 'localStorage' )) {
        return;
      }
      
      formElements.forEach( function( elem, index ) {
        window.localStorage.setItem( 'absolutexRegForm' + elem.getAttribute( 'name' ), elem.value );
      });
    }
    
    function setFormValues() {
      formElements.forEach( function( elem ) {
        if ( elem.value !== '' ) {
          return;
        }
        elem.value = window.localStorage.getItem( 'absolutexRegForm' + elem.getAttribute( 'name' ));
      });
    }
      
    function storageAvailable( type ) {
      var storage;
      try {
        storage = window[ type ];
        var x = '__storage_test__';
        storage.setItem( x, x );
        storage.removeItem(x);
        return true;
      }
      catch(e) {
        return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
      }
    }
        
  });

}( jQuery ));