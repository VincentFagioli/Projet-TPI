changeFont.onclick = function() {
    
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
};
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: ' var regex = /(\\·\\w*)/g;\n' +
              '    var rer = "";\n' +
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
              '        var chaine =  span[i].innerText;\n' +
              '        var resultat = chaine.replace(regex, rer);\n' +
              '        console.log(resultat);\n' +
              '        span[i].innerText = resultat;\n' +
              '    }'
          });
    });
    document.getElementById('changeFemale').disabled = true;
};
changeFemale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: ' var regex = /(\\S*)+(?:\\·)+(\\S*)/mg;\n' +
              '    var regex2 = /\\S*\\·+\\S*/m;\n' +
              '    var span = document.getElementsByClassName(\'Grammaticaltype\');\n' +
              '    var m;\n' +
              '    var resultat;\n' +
              '    var i;\n' +
              '    for (i = 0; i < span.length; i++) {\n' +
              '        var str = span[i].innerText;\n' +
              '        var temp=str;\n' +
              '        while ((m = regex.exec(str)) !== null) {\n' +
              '            if (m.index === regex.lastIndex) {\n' +
              '                regex.lastIndex++;\n' +
              '            }\n' +
              '            m.forEach((match, groupIndex) => {\n' +
              '                if (`${groupIndex}` == 2) {\n' +
              '                    if (m[groupIndex] === "e") {\n' +
              '                        resultat = m[1] + m[groupIndex];\n' +
              '                    }\n' +
              '                    else if (m[groupIndex] === "es") {\n' +
              '                        resultat = m[1].replace(/s+$/g, m[groupIndex]);\n' +
              '                    }\n' +
              '                    else {\n' +
              '                        resultat = m[1].substring(0, m[1].lastIndexOf(m[groupIndex].charAt(0))) + m[groupIndex]; //début à caractère trouver\n' +
              '                    }\n' +
              '                }\n' +
              '            });\n' +
              '            temp = temp.replace(regex2, resultat);  \n' +
              '        }\n' +
              '        span[i].innerText = temp;\n' +
              '    }'
          });
    });
};
