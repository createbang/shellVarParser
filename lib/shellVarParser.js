var _ = require('underscore');




var shellVarParser = {
  parse: function(value){
    var obj = {};
    
    if ( !value ) { return obj; }
    
    var content = value.toString().trim();
    var lines = content.split('\n');

    _(lines).each(function(line){
      var splitIdx = line.indexOf('=');
      // handle a line without '='
      if (splitIdx < 0) {
        splitIdx = line.length;
      }
      var key = line.substr(0, splitIdx).trim();
      var value = line.substr(splitIdx + 1).trim();

      // handle quotes for strings
      if (value.charAt(0) === '"' && value.charAt(value.length-1) == '"') {
        value = value.replace(/\\n/gm, '\n');
      }

      value = value.replace(/['"]/gm, '');

      // build return obj
      obj[key] = value;
    })

    return obj;
  }
}

module.exports = shellVarParser;
