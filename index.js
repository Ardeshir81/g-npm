const {exec} = require('child_process');

//linux
exec('which npm', (err, stdout) => {
    if (err) {
        console.error('---', err);
        return;
    }
    exec(stdout.replace('\n', '').replace('\r', '') + ' -v', (err, stdout) => {
        if (err) {
            console.log('---', err);
            return;
        }
        console.log(stdout);
    });
});

