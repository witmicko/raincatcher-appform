'use strict';

var should = require('should')
  , appformClient = require('./appformClient')
  , sinon = require('sinon')
  , _ = require('lodash')
  , fixtures = require('../../../../test/fixtures');


describe('Test Appforms Client API', function() {

  /**
   * Small utility function to create a mocked feedhenry client API.
   * @param stubs
   * @returns {*} Mocked Appforms Client
   */
  function setupClient(stubs) {
    stubs = stubs || {};
    var initStubs = {
      on: fixtures.$fh.on(),
      forms: {
        init: fixtures.$fh.forms.init(),
        on: fixtures.$fh.forms.on()
      }
    };

    var client = appformClient(_.merge(initStubs, stubs));
    client.init();
    return client;
  }

  describe("Listing Forms", function() {

    it('list works', function() {
      var stubs = {
        forms: {
          getForms: fixtures.$fh.forms.list()
        }
      };

      var client = setupClient(stubs);

      return client.list()
        .then(function(forms) {
          should(forms).not.be.empty();
          sinon.assert.calledOnce(stubs.forms.getForms);
        }, function(error) {
          throw error;
        });
    });
  });


  describe("Creating a new submission", function(done) {

    it("It should create a new submission and build the submission state", function() {
      var client = setupClient();
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
