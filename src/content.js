const url = chrome.runtime.getURL('data/data.json');

function replaceDistilleryNames( data ) {
    var elems = document.getElementsByClassName("product-page--title ");


};

fetch(url)
    .then( (response) => response.json() )
    .then( (json) => replaceDistilleryNames( json ) );

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;

            var replacedText = text.replace(/cal/gi, "butt"); // replaces "cal," "Cal", etc. with "butt"

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}