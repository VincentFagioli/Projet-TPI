testFont.onclick = function() {
    var span = document.getElementsByClassName('Fontdyslexic');
    var i;
    for (i = 0; i < span.length; i++) {
        span[i].style.fontFamily = 'opendyslexic';
    }
}

testGenderMale.onclick = function(){
    var regex = /(\·\w*)/g;
    var rer = "";
    var span = document.getElementsByClassName('Grammaticaltype');
    var i;
    for (i = 0; i < span.length; i++) {
        var chaine =  span[i].innerText;
        var resultat = chaine.replace(regex, rer);
        console.log(resultat);
        span[i].innerText = resultat;
    }
}



