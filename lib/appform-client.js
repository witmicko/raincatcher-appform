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
  $fh.forms.downloadSubmission(submissionId, function(error, submission) {
    if (error) {
      deferred.reject(new Error(error));
      return;
    }
    deferred.resolve(submission);
  });
  return deferred.promise;
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
      submissionModel.getForm(function(error, formModel) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        };
        submissionModel.on('submitted', function(submissionId) {
          deferred.resolve({
            submissionId: submissionId
          , _submission: submission
          , _submissionLocalId: uploadTask.props.submissionLocalId
          , formId: submission.props.formId
          });
        });
      })
    })
  });
  return deferred.promise;
};

module.exports = client;
