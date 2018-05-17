changeFont.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
