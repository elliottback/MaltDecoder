const selectors = [
    "span.product-box--title",              // SMWS Japan - browsing grid
    "p.product-page--title",                // SMWS Japan - individual product
    "h1.product-page--title",               // SMWS Japan - new individual product
    ".caskNo",                              // SMWS UK - Individual Product Recommendations
    "h1.page-title",                        // SMWS USA - title
    "div.product-description > p > strong", // SMWS USA - desc
    "span.search-title"                     // SMWS USA - search desc
];

// 6 digits here is not 100% future-proof
const regex = /([GABCNRW]{0,2}\d{1,3})\.\d{1,6}/i

exports.regex = regex;

exports.replaceDistilleryNames = function( data ) {
    let elems = document.querySelectorAll( selectors.join(",") );

    for( let idx = 0 ; idx < elems.length; idx++ )
    {
        let elem = elems[idx];
        let text = elem.textContent.replace(/CASK[\s]*No.[\s]*/ig,'').trim();

        if( regex.test( text ) )
        {
            let match = text.match( regex )[1].toUpperCase();

            if( match in data )
            {
                let value = data[ match ];
                let newText = text + " (" + value.name + ", " + value.region + ")";

                if( value.status.toUpperCase() != 'ACTIVE' )
                    newText += " [" + value.status.toUpperCase() + "]";

                elem.textContent = newText;
            }
        }
    }
};