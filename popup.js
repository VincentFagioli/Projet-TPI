changeFont.onclick = function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: ' var span = document.getElementsByClassName("Fontdyslexic");var i;for (i = 0; i < span.length; i++) {span[i].style.fontFamily = "opendyslexic";}'
          });
    });
};
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'var regex = /\\·\\w*/g; var rer = ""; var span = document.getElementsByClassName("Grammaticaltype");var i;for (i = 0; i < span.length; i++) { var chaine =  span[i].innerText;var resultat=chaine.replace(regex, rer);span[i].innerText =resultat;}'});
    });
};
changeFemale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'alert("Je ne suis pas encore prêt!!");'});
    });
};



