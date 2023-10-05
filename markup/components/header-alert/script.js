window.addEventListener("load", function() {
    if (window.sessionStorage.getItem("headerAlert") === "Y") {
        return;
    }
    if (window.matchMedia("(max-width: 767px)").matches) {
        Marquee3k.init();
    }
    setTimeout(function() {
        window.sessionStorage.setItem("headerAlert", "Y");
        document.getElementById("headerAlert").style.height = "50px";
        setTimeout(function() {
            document.getElementById("headerAlert").style.height = "0px";
        }, 60 * 1e3);
    }, 1e3);
});