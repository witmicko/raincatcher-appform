/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var q = require('q');
var _ = require('lodash');

var client = {};
var initComplete = false;

client.init = function() {
  var deferred = q.defer();
  $fh.on('fhinit', function(error, host) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    $fh.forms.init(function(error) {
      if (error) {
        deferred.reject(new Error(error));
      } else {
        console.log('Forms initialized.');
        initComplete = true;
        deferred.resolve();
      }
    });
  });
  return deferred.promise;
};

client.list = function() {
  var deferred = q.defer();
  $fh.forms.getForms(function(error, formsModel) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    var forms = formsModel.props.forms;
    deferred.resolve(forms);
  });
  return deferred.promise;
};

client.getForm = function(formId) {
  var deferred = q.defer();
  $fh.forms.getForm({formId: formId}, function (error, form) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    deferred.resolve(form);
  });
  return deferred.promise;
}

client.getSubmissionLocal = function(submissionLocalId) {
  var deferred = q.defer();
  $fh.forms.getSubmissions(function(error, submissions) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    submissions.getSubmissionByMeta({_ludid: submissionLocalId}, function(error, submission) {
      if (error) {
        deferred.reject(new Error(error));
        return;
      }
      deferred.resolve(submission);
    });
  });
  return deferred.promise;
}

client.getSubmission = function(submissionId) {
  var deferred = q.defer();
  $fh.forms.downloadSubmission({submissionId: submissionId}, function(error, submission) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    deferred.resolve(submission);
  });
  return deferred.promise;
}

client.getSubmissions = function(submissionIds) {
  var self = this;
  var promises = submissionIds.map(function(submissionId) {
    return self.getSubmission(submissionId);
  });
  return q.allSettled(promises);
}

client.getFields = function(submission) {
  var deferred = q.defer();
  submission.getForm(function(error, form) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    var fields = form.fields;
    var qs = [];
    _.forOwn(fields, function(field, key) {
      var _deferred = q.defer();
      qs.push(_deferred.promise);
      submission.getInputValueByFieldId(field.getFieldId(), function(error, fieldValues) {
        if (error) {
          _deferred.reject(new Error(error));
          return;
        }
        field.value = fieldValues[0];
        _deferred.resolve(fieldValues);
      });
    });
    q.all(qs).then(function() {
      deferred.resolve(fields);
    }, function(error) {
      deferred.reject(new Error(error));
    });
  });
  return deferred.promise;
}

/**
* The fields parameter is an array of {fieldId: <...>, value: <...>} objects
*/
client.createSubmission = function(form, submissionFields) {
  var deferred = q.defer();
  var submission = form.newSubmission();
  var ds = [];
  _.forEach(submissionFields, function(field) {
    var d = q.defer();
    ds.push(d.promise);
    submission.addInputValue(field, function(error, result) {
      if (error) {
        d.reject(error);
      } else {
        d.resolve(result);
      }
    });
  });
  q.all(ds)
  .then(function() {
    deferred.resolve(submission);
  }, function(error) {
    deferred.reject(new Error(error));
  });
  return deferred.promise;
};

client.submitSubmission = function(submission) {
  var deferred = q.defer();
  submission.submit(function(error, submitResponse) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    };
    deferred.resolve(submission);
  });
  return deferred.promise;
};

client.uploadSubmission = function(submission) {
  var deferred = q.defer();
  submission.upload(function(error, uploadTask) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    };
    uploadTask.submissionModel(function(error, submissionModel) {
      if (error) {
        deferred.reject(new Error(error));
        return;
      };
      deferred.resolve(submissionModel);
    })
  });
  return deferred.promise;
};

client.composeSubmissionResult = function(submission) {
  var submissionResult = {
      submissionLocalId: submission.props._ludid
    , formId: submission.props.formId
    , status: submission.props.status
  };
  if (submission.props._id) {
    submissionResult.submissionId = submission.props._id;
  }
  return q.when(submissionResult);
};

client.synchSubmissionResult = function(result) {
  // kick-off an appform upload, update the workorder when complete
  var self = this;
  return self.getSubmissionLocal(result.submission.submissionLocalId)
    .then(function(submission) {
      submission.set('metaData', {
        wfm: {
          workorderId: result.workorderId,
          step: result.step,
          timestamp: result.timestamp
        }
      });
      return self.uploadSubmission(submission)
      .then(function(submissionModel) {
        return self.watchSubmissionModel(submissionModel)
        .then(function(remoteSubmission) {
          return self.composeSubmissionResult(remoteSubmission);
        });
      });
    })
};

client.watchSubmissionModel = function(submissionModel) {
  var deferred = q.defer();
  submissionModel.on('submitted', function(submissionId) {
    $fh.forms.downloadSubmission({submissionId: submissionId}, function(error, remoteSubmission) {
      if (error) {
        deferred.reject(error);
        return;
      };
      deferred.resolve(remoteSubmission);
    });
  });
  //  TODO: Do we need a timeout here to cleanup submissionModel listeners?
  return deferred.promise;
};

module.exports = client;
