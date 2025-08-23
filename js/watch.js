#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const  { execSync } = require('child_process');

let isProcessing = false;
let debounceTimer = null;

console.log( `Starting File Watcher...`);
// console.log( `Watching: tabs/ js/ process-js.js` );

function runProcessor() {
    if ( isProcessing ) return;

    if ( debounceTimer ) {
        clearTimeout(debounceTimer);
    }


    debounceTimer = setTimeout(() => {
        
        isProcessing = true;

        try {
            execSync('node ./js/process-js.js --dev', {stdio:'inherit'});
            console.log('✅ Processing complete');
        } catch (error) {
            console.error('❌ Processing failed:', error.message );
        }

        isProcessing = false;
        debounceTimer = null;
    }, 500);
}

const watchDirs = [
    'tabs',
    'js'
];
const watchFiles = [
    'process-js.js', 
    'index.html'
];
const watchers = [];

watchDirs.forEach(dir => {
    if ( fs.existsSync(dir) ) {
        const watcher = fs.watch(dir, {recursive:true}, (eventType, filename) => {
            console.log( `${dir}/${filename} changed`);
            // setTimeout(runProcessor, 500);
            runProcessor();
        });
        watchers.push(watcher);
        console.log( `Watching ${dir}/`);
    }
});

watchFiles.forEach( file => {
    if ( fs.existsSync(file) ) {
        const watcher = fs.watch(file, () => {
            console.log( `${file} changed`);
            // setTimeout(runProcessor,500);
            runProcessor();
        });
        watchers.push(watcher);
        console.log( `Watching ${file}`);
    }
})

// if ( fs.existsSync('process-js.js') ) {
//     const processorWatcher = fs.watch('process-js.js', () => {
//         console.log('process-js.js changed');
//         setTimeout(runProcessor,500);
//     });
//     watchers.push(processorWatcher);
//     console.log( `Watching process-js.js`);
// }

// if ( fs.existsSync('index.html') ) {
//     const indexWatcher = fs.watch('index.html', () => {
//         console.log( 'index.html changed' );
//         setTimeout(runProcessor,500);
//     });
//     watchers.push(indexWatcher);
//     console.log(`Watching index.html`);
// }

runProcessor();

process.on('SIGINT', () => {
    console.log( `Stopping watchers...`);
    watchers.forEach( w => w.close() );
    process.exit(1);
});