'use strict'

debugger;
var $fh = require('../lib/feedhenry')
  , should = require('should')
  , config = require('../test-config')
  , mediator = require('fh-wfm-mediator/mediator')
  , client = require('../../lib/appform-client')
  , testHelper = require('./test-helper')
  , q = require('q')
  ;

// alternative to loading fhconfig via xhr
window.fh_app_props = require('../lib/fhconfig.json');
window.$fh = $fh;

describe('Test appforms', function() {
  before(function() {
    this.timeout(15000);
    localStorage.clear();
    testHelper.overrideNavigator();
    return client.init();
  });

  after(function() {
  });

  it('nothing blows up', function() {
    'true'.should.be.equal('true');
  });

  it.skip('list works', function() {
    return client.list()
    .then(function(forms) {
      console.log(forms);
      forms.should.not.be.empty();
    }, function(error) {
      throw error;
    })
  });

  it('creating a submission works', function() {
    var submissionFields = [
      {fieldId: '56158387bc36069871b33bef', value: 'John'},
      {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
      {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
    ];
    return client.getForm('561582e5e375d65e34dd5d8e')
    .then(function(form) {
      console.log('form', form);
      should.exist(form);
      return client.createSubmission(form, submissionFields);
    })
    .then(function(submissionResults) {
      console.log(submissionResults);
    });
  });
});
