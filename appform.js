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
});

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
});

ngModule.directive('appformPortal', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-portal.tpl.html')
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

ngModule.directive('appformField', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field.tpl.html')
  , link: function (scope, element, attrs) {
    }
  , scope: {
      field: '=value'
    }
  , controller: function($scope) {
    /*
    $$hashKey: "object:7"
    _id: "5602dd37ab4225aa697af383"
    _localLastUpdate: Fri Sep 25 2015 06:42:15 GMT-0700 (PDT)
    _ludid: null
    _type: "field"
    adminOnly: false
    fieldCode: "name"
    fieldOptions: Object
    helpText: "Input your first and last name"
    name: "Name"
    repeating: false
    required: true
    type: "text"
    */
      var self = this;
      self.field = {
        _id: $scope.field._id,
        name: $scope.field.name,
        type: ['text', 'date', 'number'].indexOf($scope.field.type) > -1 ? $scope.field.type : 'text'
      };
      self.model = {};
    }
  , controllerAs: 'ctrl'
  };
});

module.exports = 'wfm.appform';
