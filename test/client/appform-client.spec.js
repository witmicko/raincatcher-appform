'use strict';

/*globals window */

var should = require('should')
  , client = require('../../lib/angular/shared/appformsClient/appformClient')
  , sinon = require('sinon')
  , fixtures = require('../fixtures');


// alternative to loading fhconfig via xhr
window.fh_app_props = require('../lib/fhconfig.json');


describe('Test Appforms Client API', function() {
  before(function(done) {
    window.$fh = {
      on: fixtures.$fh.on(),
      forms: {
        init: fixtures.$fh.forms.init(),
        on: fixtures.$fh.forms.on()
      }
    };
    client.init().then(done);
  });

  after(function() {
    window.$fh = null;
  });

  describe("Listing Forms", function() {

    before(function() {
      window.$fh.forms.getForms = fixtures.$fh.forms.list();
    });

    it('list works', function() {
      return client.list()
        .then(function(forms) {
          should(forms).not.be.empty();
          sinon.assert.calledOnce(window.$fh.forms.getForms);
        }, function(error) {
          throw error;
        });
    });
  });


  describe("Creating a new submission", function(done) {

    it("It should create a new submission and build the submission state", function() {
      var submissionBuildStateStub = sinon.stub().callsArg(1);

      var mockSubmission = {
        buildFullSubmissionState: submissionBuildStateStub
      };

      var newSubmissionStub = sinon.stub().returns(mockSubmission);

      var mockForm = {
        newSubmission: newSubmissionStub
      };

      client.createNewSubmission(mockForm).then(function() {
        sinon.assert.calledOnce(newSubmissionStub);
        sinon.assert.calledOnce(submissionBuildStateStub);

        done();
      });
    });

  });
});
