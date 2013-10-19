shellVarParser
==============

Parse shell constant variables into a Javascript object.

Convert the contents of a shell constant variables file to a JavaScript object literal.

.env file
```sh
ENV_VAR1=foobar
ENV_VAR2=bazbang
```

js file
```js
var shellVarParser = require('shellVarParser');

var fileContents = fs.readFileSync(__dirname + '/.env', 'utf8');
var envVars = shellVarParser.parse(fileContents)

// returns {ENV_VAR1: "foobar", ENV_VAR2: "bazbang"}
```
