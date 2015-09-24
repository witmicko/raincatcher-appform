'use strict';

var angular = require('angular');
var _ = require('lodash');

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
        console.log('Forms retrieved.', err, formsModel);
        var forms = formsModel.props.forms;
        mediator.publish('wfm:appform:forms:loaded', forms);
      });
    });
  });

  mediator.subscribe('wfm:appform:form:load', function(formId) {
    formInitPromise.then(function() {
      $fh.forms.getForm({formId: formId}, function (err, form) {
        console.log('Retrieved form.', err, form);
        var fieldProps = _.map(form.fields, function(field) {
          return field.props;
        });
        var localForm = {
          id: formId,
          fields: fieldProps
        }
        mediator.publish('wfm:appform:form:loaded', localForm);
      });
    });
  });
})

ngModule.directive('appformView', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-view.tpl.html')
  , scope: {
      form: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.fields = $scope.form.fields;
    }
  , controllerAs: 'ctrl'
  };
})

module.exports = 'wfm.appform';
