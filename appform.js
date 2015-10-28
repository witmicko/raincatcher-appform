'use strict';

var _ = require('lodash');
var canvasDrawr = require('./canvas-drawr');

var ngModule = angular.module('wfm.appform', ['wfm.core.mediator']);

require('./lib');

var formInitPromise;

ngModule.run(function($q) {
  var deferred = $q.defer();
  $fh.on('fhinit', function(err, host) {
    $fh.forms.init(function(err) {
      if (err) {
        deferred.reject(err);
      } else {
        console.log('Forms initialized.');
        deferred.resolve();
      }
    });
  });
  formInitPromise = deferred.promise;
})

ngModule.run(function($q, mediator) {
  mediator.subscribe('wfm:appform:forms:load', function() {
    formInitPromise.then(function() {
      $fh.forms.getForms(function(err, formsModel) {
        if (err) {
          console.error(err);
          mediator.publish('error:wfm:appform:forms:load', forms);
          return;
        }
        var forms = formsModel.props.forms;
        mediator.publish('done:wfm:appform:forms:load', forms);
      });
    });
  });

  mediator.subscribe('wfm:appform:form:load', function(formId) {
    formInitPromise.then(function() {
      $fh.forms.getForm({formId: formId}, function (err, form) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Retrieved form.', form);
        mediator.publish('done:wfm:appform:form:load:' + formId, form);
      });
    });
  });

  mediator.subscribe('wfm:appform:submission:local:load', function(submissionLocalId) {
    formInitPromise.then(function() {
      $fh.forms.getSubmissions(function(err, submissions) {
        submissions.getSubmissionByMeta({_ludid: submissionLocalId}, function(err, submission) {
          if (err) {
            console.log(submissionLocalId, err);
            mediator.publish('error:wfm:appform:submission:local:load:'+submissionId, err);
            return;
          }
          mediator.publish('done:wfm:appform:submission:local:'+submissionLocalId, submission);
        });
      });
    });
  });

  mediator.subscribe('wfm:appform:submission:load', function(submissionId) {
    formInitPromise.then(function() {
      $fh.forms.downloadSubmission({submissionId}, function(err, submission) {
        if (err) {
          console.log(submissionId, err);
          mediator.publish('error:wfm:appform:submission:load:'+submissionId, err);
          return;
        }
        mediator.publish('done:wfm:appform:submission:load:'+submissionId, submission);
      });
    });
  });

  mediator.subscribe('wfm:appform:submission:fields:load', function(submission) {
    formInitPromise.then(function() {
      submission.getForm(function(err, form) {
        if (err) {
          console.error(err);
          mediator.publish('error:wfm:appform:submission:fields:load:'+submissionId, err);
          return;
        }
        var fields = form.fields;
        var qs = [];
        _.forOwn(fields, function(field, key) {
          var deferred = $q.defer();
          qs.push(deferred.promise);
          submission.getInputValueByFieldId(field.getFieldId(), function(err, fieldValues) {
            if (err) {
              console.error(err);
              return;
            }
            field.value = fieldValues[0];
            deferred.resolve(fieldValues);
          });
        });
        $q.all(qs).then(function() {
          mediator.publish('done:wfm:appform:submission:fields:load:'+submission.getLocalId(), fields);
        });
      });
    });
  });
});

ngModule.directive('appformSubmission', function($templateCache, $q, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-submission.tpl.html')
  , scope: {
      submissionLocalId: '=submissionLocalId'
    , submissionId: '=submissionId'
    }
  , controller: function($scope) {
      var self = this;
      var submissionPromise;
      if ($scope.submissionLocalId) {
        submissionPromise = mediator.request('wfm:appform:submission:local:load', $scope.submissionLocalId);
      } else if ($scope.submissionId) {
        submissionPromise = mediator.request('wfm:appform:submission:load', $scope.submissionId);
      } else {
        console.error('appformSubmission called with no submission');
      }
      submissionPromise.then(function(submission) {
        self.form = submission.form;
        mediator.request('wfm:appform:submission:fields:load', submission, {uid: submission.getLocalId()}).then(function(fields) {
          self.fields = fields;
        }, function(error) {
          console.error(error);
        });
      });
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appform', function($templateCache, $q, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform.tpl.html')
  , scope: {
      form: '=form'
    }
  , controller: function($scope) {
    var self = this;
    var form = $scope.form;
    self.fields = form.fields;
    self.model = {};
    _.forEach(self.fields, function(field) {
      self.model[field.props.fieldCode || field.props._id] = {};
    });
    self.done = function(isValid) {
      $scope.$broadcast('parentFormSubmitted');
      if (isValid) {
        // console.log('Form model', self.model);
        var submission = form.newSubmission();
        var qs = [];
        _.forEach(self.fields, function(field) {
          var q = $q.defer();
          qs.push($q.promise);
          var value = self.model[field.props.fieldCode || field.props._id].value;
          submission.addInputValue({
            fieldId: field.props._id,
            value: value
          }, function(err, res) {
            if (err) {
              $q.reject(err);
            } else {
              $q.resolve(res);
            }
          });
        });
        $q.all(qs).then(function() {
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
                    mediator.publish('workflow:step:done', {
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
      };
    }
  }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformField', function($templateCache, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field.tpl.html')
  , scope: {
      field: '=',
      model: '=value'
    }
  , link: function (scope, element, attrs, ctrl) {
      var parentForm = element.parent();
      while (parentForm && parentForm.prop('tagName') !== 'FORM') {
        parentForm = parentForm.parent();
      };
      if (parentForm) {
        var formController = element.find('ng-form').controller('form');
        scope.$on('parentFormSubmitted',function(event) {
          ctrl.submit(element);
          formController.$setSubmitted();
        });
      };
    }
  , controller: function($scope) {
    var self = this;
    self.field = $scope.field;
    self.model = $scope.model && $scope.model.value ? angular.copy($scope.model.value) : {};
    if (self.field.props.fieldOptions.definition && self.field.props.fieldOptions.definition.defaultValue) {
      self.model = self.field.props.fieldOptions.definition.defaultValue;
    };
    self.submit = function(element) {
      if (self.field.props.type === 'signature') {
        var canvas = element[0].getElementsByTagName('canvas')[0];
        self.model = canvas.toDataURL();
      } else if (self.field.props.type === 'location') {
        var inputs = element[0].getElementsByTagName('input');
        self.model = {
          lat: inputs[0].value,
          long: inputs[1].value
        }
      }
      $scope.model.value = self.model;
    }
  }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformFieldLocation', function($templateCache, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field-location.tpl.html')
  , scope: {
      field: '='
    , model: '=value'
    }
  , controller: function($scope) {
    var self = this;
    self.field = $scope.field;
    self.model = $scope.model || {};
    self.isValid = function(form, element) {
      console.log('form', form);
      console.log('element', element);
    }
    self.setLocation = function() {
      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.$apply(function() {
          self.model.lat = pos.coords.latitude;
          self.model.long = pos.coords.longitude;
        });
      }, function(err) {
        alert('Unable to get current position');
        self.model.lat = -1;
        self.model.long = -1;
      });
    }
  }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformFieldNumber', function($templateCache, $window, $document, $timeout, mediator) {
 return {
   restrict: 'E'
 , template: $templateCache.get('wfm-template/appform-field-number.tpl.html')
 , scope: {
   field: '=',
   model: '=value',
 }
 , controller: function($scope) {
   var self = this;
   self.field = $scope.field;
   self.model = $scope.model;
   if (self.field.props.fieldOptions.definition && self.field.props.fieldOptions.definition.defaultValue) {
     self.model = parseFloat(self.field.props.fieldOptions.definition.defaultValue);
   };
 }
 , controllerAs: 'ctrl'
 };
});

ngModule.directive('appformFieldSignature', function($templateCache, $window, $document, $injector, mediator) {
  return {
    restrict: 'E'
  , template: '<canvas></canvas>'
  , scope: {
      options: '='
    }
  , link: function (scope, element, attrs) {
      var options = scope.options || {};
      var $ionicScrollDelegate = $injector.has('ionicScrollDelegate') ? $injector.get('ionicScrollDelegate') : null;
      var drawr = new canvasDrawr.CanvasDrawr(element, options, $document, $ionicScrollDelegate);
    }
  };
});

module.exports = 'wfm.appform';
