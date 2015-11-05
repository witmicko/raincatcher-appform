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

  it('list works', function() {
    return client.list()
    .then(function(forms) {
      forms.should.not.be.empty();
    }, function(error) {
      throw error;
    })
  });

  it('creating a submission works', function() {
    this.timeout(15000);
    var submissionFields = [
      {fieldId: '56158387bc36069871b33bef', value: 'John'},
      {fieldId: '56158387bc36069871b33bf0', value: 'Doe'},
      {fieldId: '56158387bc36069871b33bf1', value: '123 A St.'}
    ];
    return client.getForm('561582e5e375d65e34dd5d8e')
    .then(function(form) {
      should.exist(form);
      form.props._id.should.equal('561582e5e375d65e34dd5d8e');
      return client.createSubmission(form, submissionFields);
    })
    .then(function(submissionResults) {
      submissionResults.formId.should.equal('561582e5e375d65e34dd5d8e');
    });
  });
});
