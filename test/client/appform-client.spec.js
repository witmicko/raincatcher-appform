'use strict'

debugger;
var $fh = require('../lib/feedhenry')
  , should = require('should')
  , config = require('../test-config')
  , mediator = require('fh-wfm-mediator/mediator')
  , client = require('../../lib/appform-client')
  , q = require('q')
  ;

// alternative to loading fhconfig via xhr
window.fh_app_props = require('../lib/fhconfig.json');
window.$fh = $fh;

describe('Test appforms', function() {
  before(function() {
    this.timeout(15000);
    localStorage.clear();
    return client.init();
  });

  after(function() {
  });

  it('nothing blows up', function() {
    'true'.should.be.equal('true');
  });

  it('list works', function() {
    return client.list()
    .then(function(forms) {
      forms.should.not.be.empty();
    }, function(error) {
      throw error;
    })
  });
});
