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
testGenderFemale.onclick = function () {
    var regex = /(\S*)+(?:\·)+(\S*)/mg;
    var regex2 = /\S*\·+\S*/m;
    var span = document.getElementsByClassName('Grammaticaltype');
    var m;
    var resultat;
    var i;
    for (i = 0; i < span.length; i++) {
        var str = span[i].innerText;
        var temp=str;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
                if (`${groupIndex}` == 2) {
                    if (m[groupIndex] === "e") {
                        resultat = m[1] + m[groupIndex];
                    }
                    else if (m[groupIndex] === "es") {
                        resultat = m[1].replace(/s+$/g, m[groupIndex]);
                    }
                    else {
                        resultat = m[1].substring(0, m[1].lastIndexOf(m[groupIndex].charAt(0))) + m[groupIndex]; //début à caractère trouver
                    }
                }
            });
            temp = temp.replace(regex2, resultat);
        }
        span[i].innerText = temp;
    }
}

