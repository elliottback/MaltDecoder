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

    for( var idx = 0 ; idx < elems.length; idx++ )
    {
        var elem = elems[idx];

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