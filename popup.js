/*changeFont.onclick = function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.insertCSS(
            tabs[0].id,
            {code: ' <link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39" rel="stylesheet">\n' +
                '    var span = document.getElementsByClassName(\'Fontdyslexic\'); \n' +
                '    var i; \n' +
                '    for (i = 0; i < span.length; i++){ \n' +
                '        span[i].style.fontFamily = \'Libre Barcode 39\';\n' +
                '    }'});
    });
};*/
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
            
          {code:' // la regex sélectionne le · et tous les caractère qui suivent //bug restant si le mot est suivit d\'un . ou d\'une , il match aussi et aussi avec du·de la , le "la" après le changement de genre \n' +
              '    var regex = /(\\·\\S*)/g;\n' +
              '    var regex2 = /du\\·de la/g;\n' +
              '    var rer = "";\n' +
              '    // Récupère les éléments qui ont la bonne la class et on les parcours ensuite avec la boucle for\n' +
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
              '        //On récupère le texte de l\'élément \n' +
              '        var chaine =  span[i].innerText;\n' +
              '        if(chaine.match(regex2)){\n' +
              '            chaine = chaine.replace(regex2, "du");\n' +
              '        }\n' +
              '        // On remplace tous ce qui match avec la regex par ""\n' +
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
          {code:' // le bug restant est avec les mot ou le e devient è au féminin il est contournable avec une autre syntaxe mais il faudrait rajouter un test\n' +
              '    // la regex séléctionne tous texte qui est suivit d\'un· et tous ce qui suit jusqu\'a l\'espace, avec les parenthèse on sépare le texte avant le · et celui qui suit\n' +
              '    var regex = /(\\S*)+(?:\\·)+(\\S*)/mg;\n' +
              '    //la regex séléctionne tous texte qui est suivit d\'un· et tous ce qui suit jusqu\'a l\'espace\n' +
              '    var regex2 = /\\S*\\·+\\S*/m;\n' +
              '    // On récupère tous les élément ayant la bonne classe et on les parcours avec la boucle for\n' +
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var m;\n' +
              '    var resultat;\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
              '        // On récupérer le texte de l\'élément et on le stocke dans str et dans temp\n' +
              '        var str = span[i].innerText;\n' +
              '        var temp=str;\n' +
              '        while ((m = regex.exec(str)) !== null) {\n' +
              '            //Permet de sortir de la boucle while si rien n\'a matché\n' +
              '            if (m.index === regex.lastIndex) {\n' +
              '                regex.lastIndex++;\n' +
              '            }\n' +
              '            //Pour chaque élément séléectionner avec les paranthèse du regex\n' +
              '            m.forEach((match, groupIndex) => {\n' +
              '                //Quand le foreach traite le texte après le ·\n' +
              '                if (`${groupIndex}` == 2) {\n' +
              '                    //si c\'est e on le rajoute simplement à la fin du mot \n' +
              '                    if (m[groupIndex] === "e") {\n' +
              '                        resultat = m[1] + m[groupIndex];\n' +
              '                    }\n' +
              '                    //si c\'est es on enlève le s du premier et on rajoute es\n' +
              '                    else if (m[groupIndex] === "es") {\n' +
              '                        resultat = m[1].replace(/s+$/g, m[groupIndex]);\n' +
              '                    }\n' +
              '                    // sinon on prend le texte avant le · jusqu\'a la dernière lettre qui match avec la première du 2ème mot par exemple utilisateur·trice donne utilisa et on rajoute ensuite le 2ème mot donc dans cet exemple trice \n' +
              '                    else if (m[groupIndex].charAt(0) === "è"){\n' +
              '                        resultat = m[1].substring(0, m[1].lastIndexOf("e")) + m[groupIndex];\n' +
              '                    }\n' +
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
};
