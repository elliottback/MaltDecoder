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
const localRegex = /([GABCNRW]{0,2}\d{1,3})\.\d{1,6}/i

export const regex = localRegex;

export function replaceDistilleryNames( data ) {
    let elems = document.querySelectorAll( selectors.join(",") );

    for( let elem of elems )
    {
        let text = elem.textContent.replace(/CASK\s*No.\s*/ig,'').trim();

        if( localRegex.test( text ) )
        {
            let match = text.match( localRegex )[1].toUpperCase();

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