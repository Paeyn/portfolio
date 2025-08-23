#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const TABS_DIR = './tabs';
const JS_DIR = './js';
const PLACEHOLDER = '[[codehere]]';
const __DEV__ = process.argv.includes('--dev');
const MAIN = './index.html';
const DEVFILE = './index.dev.html';
const OUTPUT = __DEV__ ? DEVFILE : MAIN;

console.log('Starting JS injection process...');

let mainHTMLContent;
if ( __DEV__ ) {
    if ( fs.existsSync(MAIN) ) {
        // fs.copyFileSync(MAIN,DEVFILE);
        mainHTMLContent = fs.readFileSync(MAIN, 'utf8');
        console.log(`Created index.dev.html from index.html template`);
    } else {
        console.error(`Error: ${MAIN} not found`);
        process.exit(1);
    }
}

if ( !fs.existsSync(TABS_DIR) ) {
    console.error(`❌ Error: ${TABS_DIR} directory not found`);
    process.exit(1);
}

if ( !fs.existsSync(JS_DIR) ) {
    console.error(`❌ Error: ${JS_DIR} directory not found`);
    process.exit(1);
}

// if ( !fs.existsSync(OUTPUT) ) {
//     console.error(`❌ Error: ${OUTPUT} not found`);
//     process.exit(1);
// }

const htmlFiles = fs.readdirSync(TABS_DIR).filter( f => f.endsWith('.html') );
console.log( `Found ${htmlFiles.length} HTML files in tabs directory` );

let processedCount = 0;
let errorCount = 0;
const processedTabs = {};

htmlFiles.forEach( htmlFile => {
    const baseName = path.basename(htmlFile, '.html');
    const jsFile = `${baseName}.js`;

    const htmlPath = path.join(TABS_DIR, htmlFile);
    const jsPath = path.join(JS_DIR, jsFile);

    console.log( `Processing: ${htmlFile} -> looking for ${jsFile}`);

    try {

        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        if ( !htmlContent.includes(PLACEHOLDER) ) {
            console.warn(`⚠️ Warning: ${htmlFile} does not contain placeholder: ${PLACEHOLDER}` );
            return;
        }

        if ( !fs.existsSync(jsPath) ) {
            console.warn(`⚠️ Warning: Corresponding JS file ${jsFile} NOT found`);
            return;
        }

        const jsContent = fs.readFileSync(jsPath, 'utf8');
        const scriptTag = `${jsContent}`;
        htmlContent = htmlContent.replace(PLACEHOLDER,scriptTag);

        // fs.writeFileSync(htmlPath, updateHtml, 'utf8');

        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        const processedContent = document.body ? document.body.innerHTML : document.documentElement.innerHTML;
        processedTabs[baseName] = processedContent;

        console.log(`✅ Successfully processed: ${htmlFile}`);
        processedCount++;

    } catch (error) {
        console.error( `❌ Error processing ${htmlFile}:`, error.message );
        errorCount++;
    }
});

try {

    // const mainHTMLContent = fs.readFileSync(OUTPUT, 'utf8');
    const mainDOM = new JSDOM(mainHTMLContent);
    const mainDocument = mainDOM.window.document;

    let insertionCount = 0;

    Object.entries(processedTabs).forEach(([tabName,tabContent]) => {
        const targetDiv = mainDocument.getElementById(tabName);
        if ( targetDiv ) {
            targetDiv.innerHTML = tabContent;
            console.log( `✅ Inserted ${tabName} tabContent into div#${tabName}`);
            insertionCount++;
        } else {
            console.warn(`⚠️ Warning: No div found with id=${tabName} in ${OUTPUT}`);
        }
    });

    const updatedHtml = mainDOM.serialize();
    fs.writeFileSync(OUTPUT, updatedHtml, 'utf8');

} catch (error) {
    console.error(`❌ Error processing main HTML file:`, error.message );
    process.exit(1);
}

console.log( `Successfully processed: ${processedCount} files` );
console.log( `Errors: ${errorCount} files` );

Object.keys(processedTabs).forEach(tabName => {
    console.log( `Tab: ${tabName} -> processed in memory -> inserted into div#${tabName}` );
});

if ( errorCount > 0 ) {
    console.log( '❌ Errors, check logs above' );
    process.exit(1);
} else {
    console.log( 'DONE!' );
}