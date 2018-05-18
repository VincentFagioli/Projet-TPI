testFont.onclick = function() {
    var span = document.getElementsByClassName('Fontdyslexic');
    var i;
    for (i = 0; i < span.length; i++) {
        span[i].style.fontFamily = 'opendyslexic';
    }
}