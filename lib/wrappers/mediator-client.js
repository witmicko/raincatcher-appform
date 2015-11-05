'use strict';

var client = require('../appform-client')

function wrapper(mediator) {
  mediator.subscribe('appform:init', function() {
    client.init()
    .then(function() {
      mediator.publish('done:appform:init');
    }, function(error) {
      mediator.publish('error:appform:init', error);
    });
  });

  mediator.subscribe('appform:form:list', function() {
    client.list()
    .then(function(forms) {
      mediator.publish('done:appform:form:list', forms);
    }, function(error) {
      mediator.publish('error:appform:form:list', error);
    });
  });

  mediator.subscribe('appform:form:load', function(formId) {
    client.getForm(formId)
    .then(function(form) {
      mediator.publish('done:appform:form:load:' + formId, form);
    }, function(error) {
      mediator.publish('error:appform:form:load:' + formId, error);
    });
  });

  mediator.subscribe('appform:submission:local:load', function(submissionLocalId) {
    client.getSubmissionLocal(submissionLocalId)
    .then(function(submission) {
      mediator.publish('done:appform:submission:local:load:'+submissionLocalId, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:local:load:'+submissionLocalId, error);
    });
  });

  mediator.subscribe('appform:submission:remote:load', function(submissionId) {
    client.getSubmission(submissionId)
    .then(function(submission) {
      mediator.publish('done:appform:submission:remote:load:'+submissionId, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:remote:load:'+submissionId, error);
    });
  });

  mediator.subscribe('appform:submission:field:list', function(submission) {
    client.getFields(submission)
    .then(function(fields) {
      mediator.publish('done:appform:submission:field:list:'+submission.getLocalId(), fields);
    }, function(error) {
      mediator.publish('error:appform:submission:field:list:'+submission.getLocalId(), error);
    });
  });

  mediator.subscribe('appform:submission:create', function(form, submissionFields, ts) {
    client.createSubmission(form, submissionFields)
    .then(function(submission) {
      mediator.publish('done:appform:submission:create:' + ts, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:create:' + ts, error);
    });
  });

  mediator.subscribe('appform:submission:submit', function(submission) {
    client.submitSubmission(submission)
    .then(function(submission) {
      mediator.publish('done:appform:submission:submit:' + submission.getLocalId(), submission);
    }, function(error) {
      mediator.publish('error:appform:submission:submit:' + submission.getLocalId(), error);
    });
  });

  mediator.subscribe('appform:submission:upload', function(submission) {
    client.uploadSubmission(submission)
    .then(function(submission) {
      mediator.publish('done:appform:submission:upload:' + submission._submissionLocalId, submission);
    }, function(error) {
      mediator.publish('error:appform:submission:upload:' + submission.getLocalId(), error);
    });
  });
};

module.exports = wrapper;
