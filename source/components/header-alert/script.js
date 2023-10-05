window.addEventListener('load', function () {
  if (window.sessionStorage.getItem('headerAlert') === 'Y') {
    return;
  }
  if (window.matchMedia('(max-width: 767px)').matches) {
    Marquee3k.init();
  }
  setTimeout(function () {
    //session
    window.sessionStorage.setItem('headerAlert', 'Y');
    //show alert
    document.getElementById('headerAlert').style.height = '50px';
    setTimeout(function () {
      //close alert
      document.getElementById('headerAlert').style.height = '0px';
    }, 60 * 1000);
  }, 1000);
});
