//Description: Code Javascript réagissant aux clique sur les boutons de la page test.html, cette page ma permit de tester le code au fur et à mesure
// Date:07.06.2018
// Auteur:Vincent Fagioli
testFont.onclick = function() {
    var span = document.getElementsByClassName('Fontdyslexic');
    var i;
    for (i = 0; i < span.length; i++) {
        span[i].style.fontFamily = 'opendyslexic';
    }
}

testGenderMale.onclick = function(){
    // la regex sélectionne le · et tous les caractère qui suivent //bug restant si le mot est suivit d'un . ou d'une , il match aussi et aussi avec du·de la , le "la" après le changement de genre 
    var regex = /\·\S*[^.,;:!?`'"¨>}\]\/*\s]/g;
    //Cette regex sert à repérer dans le texte le cas spécial du·de la qui nécessite un traitement différent en raison de l’espace dans la partie au féminin
    var regex2 = /du\·de la/g;
    var rer = "";
    // Récupère les éléments qui ont la bonne la class et on les parcours ensuite avec la boucle for
    var span = document.getElementsByClassName('Grammaticaltype');
    var i;
    for (i = 0; i < span.length; i++) {
        //On récupère le texte de l'élément 
        var chaine =  span[i].innerText;
        //Si du texte match avec la 2ème regex on va aller remplacer toute la partie du·de la par du, cela permet de retirer complétement la partie au  féminin et de laisser seulement le texte masculin
        if(chaine.match(regex2)){
            chaine = chaine.replace(regex2, "du");
        }
        // On remplace tous ce qui match avec la regex par ""
        var resultat = chaine.replace(regex, rer);
        // On remet le nouveau texte dans l'élément
        span[i].innerText = resultat;
    }
}
testGenderFemale.onclick = function () {
    // la regex séléctionne tous texte qui est suivit d'un· et tous ce qui suit jusqu'a l'espace, avec les parenthèse on sépare le texte avant le · et celui qui suit
    var regex = /(\S*)+(?:\·)+(\S*[^.,;:!?`'"¨>}\]\/*\s])/mg;
    //la regex séléctionne tous texte qui est suivit d'un· et tous ce qui suit jusqu'a l'espace
    var regex2 = /\S*\·+(\S*[^.,;:!?`'"¨>}\]\/*\s])/m;
    // On récupère tous les élément ayant la bonne classe et on les parcours avec la boucle for
    var span = document.getElementsByClassName('Grammaticaltype');
    var m;
    var resultat;
    var i;
    for (i = 0; i < span.length; i++) {
        // On récupére le texte de l'élément et on le stocke dans str et dans temp
        var str = span[i].innerText;
        var temp=str;
        while ((m = regex.exec(str)) !== null) {
            //Permet de sortir de la boucle while si rien ne correspond dans le texte
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            //Pour chaque élément sélectionner avec les paranthèse du regex
            m.forEach((match, groupIndex) => {
                //Quand le foreach traite le texte après le · on sait que le groupindex sera = à 2 quand on traite la partie féminine car à chaque itération de la boucle while on traite un nouveau élément qui à match avec la regex et cela ce présente toujour ainsi: groupindex 0 le mot complet avec la partie masculine et féminin, group index 1 la partie masculine et groupindex 2 la partie féminine
                if (`${groupIndex}` == 2) {
                    //si c'est e on le rajoute simplement à la fin du mot, tte et là pour traiter le cas du ce·tte ou il faut aussi simplement le rajouter à la fin et le dernier est là pour vérifier si le dernier caractère du mot masculin correspond au premier du mot féminin si c'est le cas on le rajoute aussi simple à la fin comme dans gros·se 
                    if (m[groupIndex] === "e" || m[groupIndex] === "tte" || m[1].charAt((m[1].length-1))=== m[groupIndex].charAt(0)  ) {
                        resultat = m[1] + m[groupIndex];
                    }
                    //si c'est es on enlève le s du premier et on rajoute es à la fin du mot ou si c'est tes on enlève aussi le s et on rajoute tes à la fin cela sert à géré le cas du tous·tes, le dernier cas sert à gérer le cas ou l'avant dernier caractère du mot masculin correspond au premier de la partie féminine comme dans chefs·fes ou il suffit d'enlever le s et de rajouter la partie féminine à la suite.
                    else if (m[groupIndex] === "es" || m[groupIndex] === "tes" || m[1].charAt((m[1].length-2))=== m[groupIndex].charAt(0)) {
                        resultat = m[1].replace(/s+$/g, m[groupIndex]);
                    }
                    // Si le premier caractère du mot féminin est un è cela veut dire que au masculin cette un e, on va donc prendre tout le mot masculin jusqu'au e et rajouter la partie féminine à la fin
                    else if (m[groupIndex].charAt(0) === "è"){
                        resultat = m[1].substring(0, m[1].lastIndexOf("e")) + m[groupIndex];
                    }
                    // sinon on prend le texte avant le · jusqu'a la dernière lettre qui match avec la première du 2ème mot par exemple utilisateur·trice donne utilisa et on rajoute ensuite le 2ème mot donc dans cet exemple trice 
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

