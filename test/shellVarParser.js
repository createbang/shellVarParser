var assert         = require('assert'),
    should         = require('should'),
    shellVarParser = require('../lib/shellVarParser');

var parsed = function(str) {
  return shellVarParser.parse(str);
}

describe('shellVarParser', function() {
  describe('.parse()', function() {
    it('sets the basic environment variables', function() {
      parsed('BASIC=basic').BASIC.should.eql("basic");
    });

    it('sets double quotes environment variables', function() {
      parsed('DOUBLE_QUOTES="double_quotes"').DOUBLE_QUOTES.should.eql("double_quotes");
    });

    it('sets single quotes environment variables', function() {
      parsed("SINGLE_QUOTES='single_quotes'").SINGLE_QUOTES.should.eql("single_quotes");
    });

    it('expands newlines if double quoted', function() {
      parsed('EXPAND_NEWLINES="expand\\nnewlines"').EXPAND_NEWLINES.should.eql("expand\nnewlines");
    });

    it('does not expand newlines if unquoted', function() {
      parsed('DONT_EXPAND_NEWLINES_UNQUOTED=dontexpand\\nnewlines').DONT_EXPAND_NEWLINES_UNQUOTED.should.eql("dontexpand\\nnewlines");
    });

    it('does not expand newlines if single-quoted', function() {
      parsed("DONT_EXPAND_NEWLINES_SINGLE_QUOTED='dontexpand\\nnewlines'").DONT_EXPAND_NEWLINES_SINGLE_QUOTED.should.eql("dontexpand\\nnewlines");
    });
    
    it('allows equals in the value', function() {
      parsed("EQUALS_IN_VALUE=this!=that,me == myself").EQUALS_IN_VALUE.should.equal("this!=that,me == myself");
    });
    
    it('does not break on a key with blank value', function() {
      parsed("BLANK_VALUE=").BLANK_VALUE.should.eql("");
    });

    it('does not break on a key with missing value', function() {
      parsed("NO_VALUE").NO_VALUE.should.eql("");
    });
  });
});
