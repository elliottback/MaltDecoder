const url = chrome.runtime.getURL('data/data.json');

const selectors = [
    "span.product-box--title", // SMWS Japan - browsing grid
    "p.product-page--title" // SMWS Japan - individual product
];

function replaceDistilleryNames( data ) {
    var elems = [];

    selectors.forEach( function( selector )
    {
        elems.append( document.querySelectorAll(selector) );
    } );

    for( var elem : elems )
    {
        for( const [key, value] of Object.entries(data) )
        {
            var text = elem.innerText;

            if( text.match(/key\./) )
            {
                elem.innerText = text + " (" +value.name ")"
                break;
            }
        }
    }
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



            if (replacedText !== text) {

            }
        }
    }
}