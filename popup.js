changeFont.onclick = function() {
    //Obtient l'onglet sur lequel le plugin est lancé
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //Injecte du Javascript sur l'onglet précédemment récupérer
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'alert("Je ne suis pas encore prêt!!");'});
    });
};
changeMale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'alert("Je ne suis pas encore prêt!!");'});
    });
};
changeFemale.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'alert("Je ne suis pas encore prêt!!");'});
    });
};
