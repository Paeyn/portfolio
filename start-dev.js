const fs = require('fs');

function cleanup() {
    console.log( `Cleaning up development files` );
    if ( fs.existsSync('./index.dev.html') ) {
        fs.unlinkSync('./index.dev.html');
        console.log( `Removed index.dev.html` );
    }
    console.log( `Cleanup complete` );
}

console.log( `Starting development watcher...` );

console.log( `Running initial processing...` );

try {

    const { execSync } = require('child_process');
    execSync('node process-js.js --dev', {stdio: 'inherit'});
    console.log( 'Initial processing complete');

} catch (error) {
    console.error(`Error running initial processing:`, error.message );
}

console.log( `Starting File Watcher...` );
const watcher = require('./watch.js' );

console.log( `Development environment ready!` );

process.on('exit', cleanup );