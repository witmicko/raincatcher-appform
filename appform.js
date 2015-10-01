'use strict';

var angular = require('angular');
var _ = require('lodash');
var canvasDrawr = require('./canvas-drawr');

var ngModule = angular.module('wfm.appform', ['wfm.core.mediator']);

require('./lib');

var formInitPromise;

ngModule.run(function($q) {
  var deferred = $q.defer();
  $fh.on('fhinit', function(err, host) {
    $fh.forms.init(function(err, res) {
      if (err) {
        deferred.reject(err);
      } else {
        console.log('Forms initialized. ', res);
        deferred.resolve(res);
      }
    });
  });
  formInitPromise = deferred.promise;
})

ngModule.run(function($q, mediator) {
  mediator.subscribe('wfm:appform:forms:load', function() {
    formInitPromise.then(function() {
      $fh.forms.getForms(function(err, formsModel) {
        // console.log('Forms retrieved.', err, formsModel);
        var forms = formsModel.props.forms;
        mediator.publish('wfm:appform:forms:loaded', forms);
      });
    });
  });

  mediator.subscribe('wfm:appform:form:load', function(formId) {
    formInitPromise.then(function() {
      $fh.forms.getForm({formId: formId}, function (err, form) {
        console.log('Retrieved form.', err, form);
        mediator.publish('wfm:appform:form:loaded', form);
      });
    });
  });
});

ngModule.directive('appformView', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-portal-view.tpl.html')
  , scope: {
      form: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.fields = $scope.form.fields;
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformPortal', function($templateCache, $q, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-portal.tpl.html')
  , scope: {
      form: '=value'
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
        if (isValid) {
          $scope.$broadcast('parentFormSubmitted');
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
            submission.submit(function(err, res) {
              console.log('Submission results', err, res);
              submission.upload(function(err, res) {
                console.log('Upload results', err, res);
              });
            }, function(err) {
              console.err(err);
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
  , template: $templateCache.get('wfm-template/appform-portal-field.tpl.html')
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
      var input = element.find('input');
      if (scope.field.props.type === 'number') {
        $timeout(function() {
          var digits = Math.max(scope.field.props.fieldOptions.validation.max.toString().length, scope.field.props.fieldOptions.validation.min.toString().length);
          if (digits) {
            digits = digits + 6;
            element.find('input').css('width', digits + 'ex');
          }
        });
      }
      input.attr()
    }
  , scope: {
      field: '=',
      model: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.field = $scope.field;
      self.inputType = function(fieldType) {
        return ['text', 'number', 'date'].indexOf(fieldType) > -1 ? self.fieldType : 'text';
      };
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
  , template: $templateCache.get('wfm-template/appform-portal-field-location.tpl.html')
  , link: function (scope, element, attrs, ctrl) {
    }
  , scope: {
      field: '=',
      model: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.field = $scope.field;
      self.model = $scope.model;
      self.getLocation = function() {
        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.$apply(function() {
            self.model = {
              lat: pos.coords.latitude,
              long: pos.coords.longitude
            };
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
  , template: $templateCache.get('wfm-template/appform-portal-field-number.tpl.html')
  , link: function (scope, element, attrs, ctrl) {
      var input = element.find('input');
      $timeout(function() {
        var digits = Math.max(scope.field.props.fieldOptions.validation.max.toString().length, scope.field.props.fieldOptions.validation.min.toString().length);
        if (digits) {
          digits = digits + 6;
          element.find('input').css('width', digits + 'ex');
        }
      });
    }
  , scope: {
      field: '=',
      model: '=value'
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

ngModule.directive('appformFieldSignature', function($templateCache, $window, $document, mediator) {
  return {
    restrict: 'E'
  , template: '<div class="appform-portal-signature-field"><canvas></canvas></div>'
  , scope: {
      options: '='
    }
  , link: function (scope, element, attrs) {
      var options = scope.options || {};
      var drawr = new canvasDrawr.CanvasDrawrMouse(element, options);
    }
  };
})

module.exports = 'wfm.appform';
