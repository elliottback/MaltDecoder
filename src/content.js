var replacer = require('./replace');

const url = chrome.runtime.getURL('data/data.json');

fetch( url, { mode: 'same-origin' } )
    .then( (response) => response.json() )
    .then( (json) => replacer.replaceDistilleryNames( json ) )
    .catch(rejected => {
        console.log(rejected);
    });