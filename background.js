//Description: Code permettant d'interagir avec les onglets ouverts sur Chrome
// Date:07.06.2018
// Auteur:Vincent Fagioli
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
