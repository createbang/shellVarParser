var assert         = require('assert'),
    should         = require('should'),
    fs             = require('fs'),
    shellVarParser = require('../lib/shellVarParser');

describe('shellVarParser', function() {
  describe('.parse()', function() {
    var env;

    before(function() {
      env = shellVarParser.parse(fs.readFileSync(__dirname + '/.env', 'utf8'));
    });

    it('sets the basic environment variables', function() {
      env.BASIC.should.eql("basic");
    });

    it('sets double quotes environment variables', function() {
      env.DOUBLE_QUOTES.should.eql("double_quotes");
    });

    it('sets single quotes environment variables', function() {
      env.SINGLE_QUOTES.should.eql("single_quotes");
    });

    it('expands newlines if double quoted', function() {
      env.EXPAND_NEWLINES.should.eql("expand\nnewlines");
    });

    it('does not expand newlines if unquoted', function() {
      env.DONT_EXPAND_NEWLINES_UNQUOTED.should.eql("dontexpand\\nnewlines");
    });

    it('does not expand newlines if single-quoted', function() {
      env.DONT_EXPAND_NEWLINES_SINGLE_QUOTED.should.eql("dontexpand\\nnewlines");
    });
  });
});
