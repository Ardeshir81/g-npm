#! /usr/bin/env node

// TODO: checkout npm config get prefix

const {exec} = require('child_process');

function npmAddress(stdout) {
return stdout.substr(0,stdout.length -1);
}

function getGlobalNpmPath() {
    return new Promise((resolve, reject) => {
        exec('which npm', (err, stdout) => {
            if (err) {
                reject(err);
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
        exec(npmPath + ' ' + args, logExecResult)
    });
}

console.log('npm version:');
npm('-v');

let commandToRun = process.argv.splice(2,process.argv.length - 1).join(' ');

npm(commandToRun);

module.exports = npm;
