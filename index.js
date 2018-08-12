//TODO: checkout npm config get prefix

const {exec} = require('child_process');

function npmAddress(stdout) {
    return stdout
        .substr(0, stdout.indexOf('\n') > 0 ? stdout.indexOf('\n') : stdout.length)
        .substr(0, stdout.indexOf('\n') > 0 ? stdout.indexOf('\r') : stdout.length);
}

function getGlobalNpmPath() {
    return new Promise((resolve, reject) => {
        exec('which npm', (err1, stdout) => {
            if (err1) {
                exec('where npm', (err2, stdout) => {
                    if (err2) {
                        reject({err1, err2});
                    }
                    resolve(npmAddress(stdout));
                });
                return;
            }
            resolve(npmAddress(stdout));
        });
    });
}

function wrapInString(input) {
    return `"${input}"`;
}

function logExecResult(err, stdout) {
    if (err) {
        throw err;
    }

    console.log(stdout);
}

function npm(args) {
    getGlobalNpmPath().then(result => {
        let npmPath = wrapInString(result);
        console.log('executing', npmPath + ' ' + args);
        exec(npmPath + ' ' + args, logExecResult)
    });
}

console.log('node version:');
npm('-v');

module.exports = npm;
