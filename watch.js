#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const  { execSync } = require('child_process');

let isProcessing = false;

console.log( `Starting file watcher...`);
// console.log( `Watching: tabs/ js/ process-js.js` );

function runProcessor() {
    if ( isProcessing ) return;

    isProcessing = true;

    try {
        execSync('node process-js.js', {stdio:'inherit'});
        console.log('✅ Processing complete');
    } catch (error) {
        console.error('❌ Processing failed:', error.message );
    }

    isProcessing = false;
}

const watchDirs = ['tabs','js'];
const watchers = [];

watchDirs.forEach(dir => {
    if ( fs.existsSync(dir) ) {
        const watcher = fs.watch(dir, {recursive:true}, (eventType, filename) => {
            console.log( `${dir}/${filename} changed`);
            setTimeout(runProcessor, 100);
        });
        watchers.push(watcher);
        console.log( `Watching ${dir}/`);
    }
});

if ( fs.existsSync('process-js.js') ) {
    const processorWatcher = fs.watch('process-js.js', () => {
        console.log('process-js.js changed');
        setTimeout(runProcessor,100);
    });
    watchers.push(processorWatcher);
    console.log( `Watching process-js.js`);
}

runProcessor();

process.on('SIGINT', () => {
    console.log( `Stopping watchers...`);
    watchers.forEach( w => w.close() );
    process.exit(1);
});