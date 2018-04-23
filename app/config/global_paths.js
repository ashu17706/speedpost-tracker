var path = require('path');
console.log(path);

var appDir = path.dirname(require.main.filename);
const temp_path = {
    "captcha": `${appDir}/app/tmp/captcha.png`
}
console.log(appDir);

module.exports = temp_path;