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
    if (error && error !== true) {
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
    console.log('callback arguments', arguments);
    if (error) {
      debugger;
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
  console.log('Creating submission for form id:', form.props._id);
  console.log('with submission fields:', submissionFields);
  var deferred = q.defer();
  var submission = form.newSubmission();
  var qs = [];
  _.forEach(submissionFields, function(field) {
    var q = $q.defer();
    qs.push($q.promise);
    submission.addInputValue(field, function(err, res) {
      if (err) {
        $q.reject(err);
      } else {
        $q.resolve(res);
      }
    });
  });
  $q.all(qs)
  .then(function() {
    submission.submit(function(err, submitResponse) {
      if (err) {
        console.log(err);
        return;
      };
      submission.upload(function(err, uploadTask) {
        if (err) {
          console.log(err);
          return;
        };
        uploadTask.submissionModel(function(err, submissionModel) {
          submissionModel.getForm(function(err, formModel) {
            submissionModel.on('submitted', function(submissionId) { // TODO: Move this call to allow for offline support
              console.log('Submission complete for', submissionId);
              deferred.resolve({
                submissionId: submissionId
              , _submissionLocalId: uploadTask.props.submissionLocalId
              , formId: form.props._id
              });
            });
          })
        })
      });
    }, function(err) {
      console.error(err);
    });
  });
}

module.exports = client;
