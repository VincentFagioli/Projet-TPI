testFont.onclick = function() {
    var span = document.getElementsByClassName('Fontdyslexic');
    var i;
    for (i = 0; i < span.length; i++) {
        span[i].style.fontFamily = 'opendyslexic';
    }
}

testGenderMale.onclick = function(){
    // la regex sélectionne le · et tous les caractère qui suivent //bug restant si le mot est suivit d'un . ou d'une , il match aussi et aussi avec du·de la , le "la" après le changement de genre 
    var regex = /(\·\S*)/g;
    var regex2 = /du\·de la/g;
    var rer = "";
    // Récupère les éléments qui ont la bonne la class et on les parcours ensuite avec la boucle for
    var span = document.getElementsByClassName('Grammaticaltype');
    var i;
    for (i = 0; i < span.length; i++) {
        //On récupère le texte de l'élément 
        var chaine =  span[i].innerText;
        if(chaine.match(regex2)){
            chaine = chaine.replace(regex2, "du");
        }

            // On remplace tous ce qui match avec la regex par ""
            var resultat = chaine.replace(regex, rer);
        console.log(resultat);
        // On remet le nouveau texte dans l'élément
        span[i].innerText = resultat;
    }
}
testGenderFemale.onclick = function () {
    // le bug restant est avec les mot ou le e devient è au féminin il est contournable avec une autre syntaxe mais il faudrait rajouter un test
    // la regex séléctionne tous texte qui est suivit d'un· et tous ce qui suit jusqu'a l'espace, avec les parenthèse on sépare le texte avant le · et celui qui suit
    var regex = /(\S*)+(?:\·)+(\S*)/mg;
    //la regex séléctionne tous texte qui est suivit d'un· et tous ce qui suit jusqu'a l'espace
    var regex2 = /\S*\·+\S*/m;
    // On récupère tous les élément ayant la bonne classe et on les parcours avec la boucle for
    var span = document.getElementsByClassName('Grammaticaltype');
    var m;
    var resultat;
    var i;
    for (i = 0; i < span.length; i++) {
        // On récupérer le texte de l'élément et on le stocke dans str et dans temp
        var str = span[i].innerText;
        var temp=str;
        
        while ((m = regex.exec(str)) !== null) {
            //Permet de sortir de la boucle while si rien n'a matché
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            //Pour chaque élément séléectionner avec les paranthèse du regex
            m.forEach((match, groupIndex) => {
                
                //Quand le foreach traite le texte après le ·
                if (`${groupIndex}` == 2) {
                    //si c'est e on le rajoute simplement à la fin du mot 
                    if (m[groupIndex] === "e") {
                        resultat = m[1] + m[groupIndex];
                    }
                    //si c'est es on enlève le s du premier et on rajoute es
                    else if (m[groupIndex] === "es") {
                        resultat = m[1].replace(/s+$/g, m[groupIndex]);
                    }
                    // sinon on prend le texte avant le · jusqu'a la dernière lettre qui match avec la première du 2ème mot par exemple utilisateur·trice donne utilisa et on rajoute ensuite le 2ème mot donc dans cet exemple trice 
                    else if (m[groupIndex].charAt(0) === "è"){
                        resultat = m[1].substring(0, m[1].lastIndexOf("e")) + m[groupIndex];
                    }
                    else {
                        resultat = m[1].substring(0, m[1].lastIndexOf(m[groupIndex].charAt(0))) + m[groupIndex]; 
                    }
                }
            });
            // on remplace le premier mot qui match avec la regex et on stocke la nouvelle phrase, vue que le mot a été traité au prochain remplacement c'est le mot suivant qui sera remplacé et ainsi de suite
            temp = temp.replace(regex2, resultat);
        }
        // une fois tous les résulats traités on met la nouvelle phrase dans le span
        span[i].innerText = temp;
    }
}

