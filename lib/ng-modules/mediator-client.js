'use strict';

var client = require('../appform-client')

module.exports = 'wfm.appform.mediator';

angular.module('wfm.appform.mediator', [
  'wfm.core.mediator'
])
.run(function($q, mediator) {

  var formInitPromise = $q.when(client.init());

  mediator.subscribe('wfm:appform:forms:load', function() {
    formInitPromise
    .then(client.list)
    .then(function(forms) {
      mediator.publish('done:wfm:appform:forms:load', forms);
    }, function(error) {
      mediator.publish('error:wfm:appform:forms:load', error);
    });
  });

  mediator.subscribe('wfm:appform:form:load', function(formId) {
    formInitPromise
    .then(function() {
      return client.getForm(formId)
    })
    .then(function(form) {
      mediator.publish('done:wfm:appform:form:load:' + formId, form);
    }, function(error) {
      mediator.publish('error:wfm:appform:form:load:' + formId, error);
    });
  });

  mediator.subscribe('wfm:appform:submission:local:load', function(submissionLocalId) {
    formInitPromise
    .then(function() {
      return client.getSubmissionLocal(submissionLocalId)
    })
    .then(function(submission) {
      mediator.publish('done:wfm:appform:submission:local:load:'+submissionLocalId, submission);
    }, function(error) {
      mediator.publish('error:wfm:appform:submission:local:load:'+submissionLocalId, error);
    });
  });

  mediator.subscribe('wfm:appform:submission:load', function(submissionId) {
    formInitPromise
    .then(function() {
      return client.getSubmission(submissionId);
    })
    .then(function(submission) {
      mediator.publish('done:wfm:appform:submission:load:'+submissionId, submission);
    }, function(error) {
      mediator.publish('error:wfm:appform:submission:load:'+submissionId, error);
    });
  });

  mediator.subscribe('wfm:appform:submission:fields:load', function(submission) {
    formInitPromise.then(function() {
      return client.getFields(submission);
    })
    .then(function(fields) {
      mediator.publish('done:wfm:appform:submission:fields:load:'+submission.getLocalId(), fields);
    }, function(error) {
      mediator.publish('error:wfm:appform:submission:fields:load:'+submission.getLocalId(), error);
    });
  });
});
