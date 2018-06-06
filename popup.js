changeFont.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //On insère d'abord le code css qui donne le lien vers la police qui est fourni avec le plugin
        chrome.tabs.insertCSS(
            tabs[0].id,
            {code: '@font-face {\n' +
                '            font-family: \'OpenDyslexic\';\n' +
                '            src: url("OpenDyslexic.otf");\n' +
                '        }'});
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: //On récupère tous les éléments ayant la bonne class et on les traite un à un avec la boucle for
                '    var span = document.getElementsByClassName(\'Fontdyslexic\');\n' +
                '    var i;\n' +
                '    for (i = 0; i < span.length; i++) {\n' +
                    //On change la police de l'élément pas OpenDyslexic
                '        span[i].style.fontFamily = \'OpenDyslexic\';\n' +
                '    }'});
    });
};
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
            
          {code: // la regex sélectionne le · et tous les caractère qui suivent //bug restant si le mot est suivit d\'un . ou d\'une , il match aussi et aussi avec du·de la , le "la" après le changement de genre
              '    var regex = /\\·\\S*[^.,;:!?`\'"¨>}\\]\\/*\\s]/g;\n' +
              '    var regex2 = /du\\·de la/g;\n' +
              '    var rer = "";\n' +
                  // Récupère les éléments qui ont la bonne la class et on les parcours ensuite avec la boucle for
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
                      //On récupère le texte de l\'élément
              '        var chaine =  span[i].innerText;\n' +
              '        if(chaine.match(regex2)){\n' +
              '            chaine = chaine.replace(regex2, "du");\n' +
              '        }\n' +
                      // On remplace tous ce qui match avec la regex par ""
              '        var resultat = chaine.replace(regex, rer);\n' +
              '        // On remet le nouveau texte dans l\'élément\n' +
              '        span[i].innerText = resultat;\n' +
              '    }'});
    });
    document.getElementById('changeFemale').disabled = true;
};
changeFemale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code:'    // la regex séléctionne tous texte qui est suivit d\'un· et tous ce qui suit jusqu\'a l\'espace, avec les parenthèse on sépare le texte avant le · et celui qui suit\n' +
              '    var regex = /(\\S*)+(?:\\·)+(\\S*[^.,;:!?`\'"¨>}\\]\\/*\\s])/mg;\n' +
              '    //la regex séléctionne tous texte qui est suivit d\'un· et tous ce qui suit jusqu\'a l\'espace\n' +
              '    var regex2 = /\\S*\\·+(\\S*[^.,;:!?`\'"¨>}\\]\\/*\\s])/m;\n' +
              '    // On récupère tous les élément ayant la bonne classe et on les parcours avec la boucle for\n' +
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var m;\n' +
              '    var resultat;\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
              '        // On récupére le texte de l\'élément et on le stocke dans str et dans temp\n' +
              '        var str = span[i].innerText;\n' +
              '        var temp=str;\n' +
              '        while ((m = regex.exec(str)) !== null) {\n' +
              '            //Permet de sortir de la boucle while si rien ne correspond dans le texte\n' +
              '            if (m.index === regex.lastIndex) {\n' +
              '                regex.lastIndex++;\n' +
              '            }\n' +
              '            //Pour chaque élément sélectionner avec les paranthèse du regex\n' +
              '            m.forEach((match, groupIndex) => {\n' +
              '                //Quand le foreach traite le texte après le · on sait que le groupindex sera = à 2 quand on traite la partie féminine car à chaque itération de la boucle while on traite un nouveau élément qui à match avec la regex et cela ce présente toujour ainsi: groupindex 0 le mot complet avec la partie masculine et féminin, group index 1 la partie masculine et groupindex 2 la partie féminine\n' +
              '                if (`${groupIndex}` == 2) {\n' +
              '                    //si c\'est e on le rajoute simplement à la fin du mot, tte et là pour traiter le cas du ce·tte ou il faut aussi simplement le rajouter à la fin et le dernier est là pour vérifier si le dernier caractère du mot masculin correspond au premier du mot féminin si c\'est le cas on le rajoute aussi simple à la fin comme dans gros·se \n' +
              '                    if (m[groupIndex] === "e" || m[groupIndex] === "tte" || m[1].charAt((m[1].length-1))=== m[groupIndex].charAt(0)  ) {\n' +
              '                        resultat = m[1] + m[groupIndex];\n' +
              '                    }\n' +
              '                    //si c\'est es on enlève le s du premier et on rajoute es à la fin du mot ou si c\'est tes on enlève aussi le s et on rajoute tes à la fin cela sert à géré le cas du tous·tes, le dernier cas sert à gérer le cas ou l\'avant dernier caractère du mot masculin correspond au premier de la partie féminine comme dans chefs·fes ou il suffit d\'enlever le s et de rajouter la partie féminine à la suite.\n' +
              '                    else if (m[groupIndex] === "es" || m[groupIndex] === "tes" || m[1].charAt((m[1].length-2))=== m[groupIndex].charAt(0)) {\n' +
              '                        resultat = m[1].replace(/s+$/g, m[groupIndex]);\n' +
              '                    }\n' +
              '                    // Si le premier caractère du mot féminin est un è cela veut dire que au masculin cette un e, on va donc prendre tout le mot masculin jusqu\'au e et rajouter la partie féminine à la fin\n' +
              '                    else if (m[groupIndex].charAt(0) === "è"){\n' +
              '                        resultat = m[1].substring(0, m[1].lastIndexOf("e")) + m[groupIndex];\n' +
              '                    }\n' +
              '                    // sinon on prend le texte avant le · jusqu\'a la dernière lettre qui match avec la première du 2ème mot par exemple utilisateur·trice donne utilisa et on rajoute ensuite le 2ème mot donc dans cet exemple trice \n' +
              '                    else {\n' +
              '                        resultat = m[1].substring(0, m[1].lastIndexOf(m[groupIndex].charAt(0))) + m[groupIndex]; \n' +
              '                    }\n' +
              '                }\n' +
              '            });\n' +
              '            // on remplace le premier mot qui match avec la regex et on stocke la nouvelle phrase, vue que le mot a été traité au prochain remplacement c\'est le mot suivant qui sera remplacé et ainsi de suite\n' +
              '            temp = temp.replace(regex2, resultat);\n' +
              '        }\n' +
              '        // une fois tous les résulats traités on met la nouvelle phrase dans le span\n' +
              '        span[i].innerText = temp;\n' +
              '    }'});
    });
    document.getElementById('changeMale').disabled = true;
};
