'use strict';

var q = require('q');
var _ = require('lodash');


/**
 * Initialising the feedhenry forms client with the feedhenry client API ($fh)
 * @param $fh
 */
module.exports = function($fh) {

  var client = {};
  var initPromise;

  /**
   *
   * Initialising the $fh.forms Client SDK. This allows the forms SDK to connect to the cloud to
   * perform any forms tasks.
   *
   * @returns {*}
   */
  client.init = function() {
    if (initPromise) {
      return initPromise;
    }
    var deferred = q.defer();
    var self = this;
    self.listeners = [];
    initPromise = deferred.promise;
    $fh.on('fhinit', function(error) {
      if (error) {
        deferred.reject(new Error(error));
        return;
      }
      $fh.forms.init(function(error) {
        if (error) {
          deferred.reject(new Error(error));
        } else {
          console.log('Forms initialized.');
          deferred.resolve();
        }
      });
    });
    $fh.forms.on("submission:submitted", function() {
      var submission = this;
      var metaData = submission.get('metaData');
      if (self.listeners.length) {
        self.composeSubmissionResult(submission).then(function(submissionResult) {
          self.listeners.forEach(function(listener) {
            listener(submissionResult, metaData);
          });
        });
      }
    });
    return initPromise;
  };

  client.addSubmissionCompleteListener = function(listener) {
    this.listeners.push(listener);
  };

  /**
   * Listing all forms associated with this App.
   * @returns {*}
   */
  client.list = function() {
    var deferred = q.defer();
    initPromise.then(function() {
      $fh.forms.getForms(function(error, formsModel) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }
        var forms = formsModel.props.forms;
        deferred.resolve(forms);
      });
    });
    return deferred.promise;
  };

  /**
   * Getting a single form definition.
   * @param formId         -- The ID of the form.
   * @returns {*|promise}
   */
  client.getForm = function(formId) {
    var deferred = q.defer();
    initPromise.then(function() {
      $fh.forms.getForm({formId: formId}, function(error, form) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }

        deferred.resolve(form);
      });
    });
    return deferred.promise;
  };

  /**
   * Creating a new submission instance for a specific form
   * @param form
   */
  client.createNewSubmission = function(form) {
    var deferred = q.defer();
    //Creating a new submission for the form
    var submission = form.newSubmission();

    //Building the current form state
    initPromise.then(function() {
      //Building the submission state for this form. This is used for binding to the field scopes and rendering.
      submission.buildFullSubmissionState(function(err) {
        if (err) {
          return deferred.reject(err);
        } else {
          return deferred.resolve(submission);
        }
      });
    });

    return deferred.promise;
  };

  /**
   *
   * Getting a Submission by the local ID.
   *
   * @param submissionLocalId
   * @returns {*}
   */
  client.getSubmissionLocal = function(submissionLocalId) {
    var deferred = q.defer();
    initPromise.then(function() {
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
    });
    return deferred.promise;
  };

  /**
   * Getting a single Submission by the remote ID.
   * @param submissionId
   * @returns {*}
   */
  client.getSubmission = function(submissionId) {
    var deferred = q.defer();
    initPromise.then(function() {
      $fh.forms.downloadSubmission({submissionId: submissionId}, function(error, submission) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }
        deferred.resolve(submission);
      });
    });
    return deferred.promise;
  };

  /**
   *
   * Getting a list of Submissions stored locally.
   *
   * @param submissionIds
   * @returns {*}
   */
  client.getSubmissions = function(submissionIds) {
    var self = this;
    var promises = submissionIds.map(function(submissionId) {
      return initPromise.then(function() {
        self.getSubmission(submissionId);
      });
    });
    return q.allSettled(promises);
  };

  /**
   * Getting a set of fields added to a single Submission.
   * @param submission
   * @returns {*}
   */
  client.getFields = function(submission) {
    var deferred = q.defer();
    initPromise.then(function() {
      submission.getForm(function(error, form) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }
        var fields = form.fields;
        var qs = [];
        _.forOwn(fields, function(field) {
          var _deferred = q.defer();
          qs.push(_deferred.promise);
          submission.getInputValueByFieldId(field.getFieldId(), function(error, fieldValues) {
            if (error) {
              _deferred.reject(new Error(error));
              return;
            }

            //TODO Need to implement repeating fields.
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
    });
    return deferred.promise;
  };


  /**
   * Validating the submission and saving it to local storage.
   *  No more editing of the submission is possible after this.
   * @param submission
   * @returns {*}
   */
  client.submitSubmission = function(submission) {
    var deferred = q.defer();
    initPromise.then(function() {
      submission.submit(function(error) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }
        deferred.resolve(submission);
      });
    });
    return deferred.promise;
  };

  /**
   * Adding a "submitted" Submission to the upload queue to the cloud.
   * @param submission
   * @returns {*}
   */
  client.uploadSubmission = function(submission) {
    var deferred = q.defer();
    initPromise.then(function() {
      submission.upload(function(error, uploadTask) {
        if (error) {
          deferred.reject(new Error(error));
          return;
        }
        uploadTask.submissionModel(function(error, submissionModel) {
          if (error) {
            deferred.reject(new Error(error));
            return;
          }
          deferred.resolve(submissionModel);
        });
      });
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

  /**
   * This process uploads the submission to the cloud, with metadata associated with the workorder. This is useful for updating workorders on
   * the cloud when a submission has completed.
   * @param workorder
   * @param stepResult
   * @returns {*}
   */
  client.syncStepResult = function(workorder, stepResult) {
    // kick-off an appform upload, update the workorder when complete
    var self = this;

    return initPromise
      .then(function() {
        return self.getSubmissionLocal(stepResult.submission.submissionLocalId);
      })
      .then(function(submission) {
        submission.set('metaData', {
          wfm: {
            workorderId: workorder.id,
            step: stepResult.step,
            timestamp: stepResult.timestamp
          }
        });
        return submission;
      })
      .then(self.uploadSubmission)
      .then(function(submissionModel) {
        self.watchSubmissionModel(submissionModel); // need this to trigget the global event
        return submissionModel;
      });
  };

  /**
   * Utility function to wait until a Submission has fully uploaded to the cloud.
   * @param submissionModel
   * @returns {*}
   */
  client.watchSubmissionModel = function(submissionModel) {
    var deferred = q.defer();
    submissionModel.on('submitted', function(submissionId) {
      $fh.forms.downloadSubmission({submissionId: submissionId}, function(error, remoteSubmission) {
        if (error) {
          deferred.reject(error);
          return;
        }
        deferred.resolve(remoteSubmission);
      });
    });
    //  TODO: Do we need a timeout here to cleanup submissionModel listeners?
    return deferred.promise;
  };

  return client;
};
