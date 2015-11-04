'use strict';

var client = require('../appform-client')

module.exports = 'wfm.appform.mediator';

angular.module('wfm.appform.mediator', [
  'wfm.core.mediator'
])
.run(function($q, mediator) {

  var formInitPromise = $q.when(client.init());

  mediator.subscribe('appform:form:list', function() {
    formInitPromise
    .then(client.list)
    .then(function(forms) {
      mediator.publish('done:appform:form:list', forms);
    }, function(error) {
      mediator.publish('error:appform:form:list', error);
    });
  });

  mediator.subscribe('appform:form:load', function(formId) {
    formInitPromise
    .then(function() {
      return client.getForm(formId)
    })
    .then(function(form) {
      mediator.publish('done:appform:form:load:' + formId, form);
    }, function(error) {
      mediator.publish('error:appform:form:load:' + formId, error);
    });
  });

  mediator.subscribe('appform:submission:local:load', function(submissionLocalId) {
    formInitPromise
    .then(function() {
      return client.getSubmissionLocal(submissionLocalId)
    })
    .then(function(submission) {
      mediator.publish('done:appform:submission:local:load:'+submissionLocalId, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:local:load:'+submissionLocalId, error);
    });
  });

  mediator.subscribe('appform:submission:remote:load', function(submissionId) {
    formInitPromise
    .then(function() {
      return client.getSubmission(submissionId);
    })
    .then(function(submission) {
      mediator.publish('done:appform:submission:remote:load:'+submissionId, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:remote:load:'+submissionId, error);
    });
  });

  mediator.subscribe('appform:submission:field:list', function(submission) {
    formInitPromise.then(function() {
      return client.getFields(submission);
    })
    .then(function(fields) {
      mediator.publish('done:appform:submission:field:list:'+submission.getLocalId(), fields);
    }, function(error) {
      mediator.publish('error:appform:submission:field:list:'+submission.getLocalId(), error);
    });
  });
});
