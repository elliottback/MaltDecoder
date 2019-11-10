const url = chrome.runtime.getURL('data/data.json');

const selectors = [
    "span.product-box--title",              // SMWS Japan - browsing grid
    "p.product-page--title",                // SMWS Japan - individual product
    "span.product-box--cask",               // SMWS - browsing grid
    "p.product-page--cask-no > span",       // SMWS - Individual Product
    "span.inc_caskNo",                      // SMWS - Individual Product Reccomendations
    "h1.page-title",                        // SMWS USA - title
    "div.product-description > p > strong", // SMWS USA - desc
    "span.search-title"                     // SMWS USA - search desc
];

function replaceDistilleryNames( data ) {
    var elems = document.querySelectorAll( selectors.join(",") );

    for( var idx = 0 ; idx < elems.length; idx++ )
    {
        var elem = elems[idx];

        for( const [key, value] of Object.entries(data) )
        {
            var text = elem.innerText.replace(/CASK[\s]*No.[\s*]/ig,'');
            var reg = new RegExp("^" + key + "\\.");

            if( text.match( reg ) )
            {
                var newText = text + " (" + value.name + ", " + value.region + ")";
                if( value.status.toUpperCase() != 'ACTIVE' )
                    newText += " [" + value.status.toUpperCase() + "]";

                elem.innerText = newText;
                break;
            }
        }
    }
};

fetch( url, { mode: 'same-origin' } )
    .then( (response) => response.json() )
    .then( (json) => replaceDistilleryNames( json ) )
    .catch(rejected => {
        console.log(rejected);
    });