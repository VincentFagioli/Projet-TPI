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
