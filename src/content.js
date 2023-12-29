import {replaceDistilleryNames} from './replace.js';

const url = chrome.runtime.getURL('data.json');

fetch( url, { mode: 'same-origin' } )
    .then( (response) => response.json() )
    .then( (json) => replaceDistilleryNames( json ) )
    .catch(rejected => {
        console.log(rejected);
    });