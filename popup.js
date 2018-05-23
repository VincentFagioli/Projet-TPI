changeFont.onclick = function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.insertCSS(
          tabs[0].id,
          {code: '@import url("https://fonts.googleapis.com/css?family=Libre+Barcode+39"); .Fontdyslexic{font-family: "Libre Barcode 39", cursive;}'
          });
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: '<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"> var span = document.getElementsByClassName("Fontdyslexic");var i;for (i = 0; i < span.length; i++) {span[i].style.fontFamily = "Lobster";}'
          });
    });
};
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'var regex = /\\·\\w*/g; var rer = ""; var span = document.getElementsByClassName("Grammaticaltype");var i;for (i = 0; i < span.length; i++) { var chaine =  span[i].innerText;var resultat=chaine.replace(regex, rer);span[i].innerText =resultat;}'});
    });
    document.getElementById('changeFemale').disabled = true;
};
changeFemale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'alert("Je ne suis pas encore prêt!!");'});
    });
};



