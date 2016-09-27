
/*global angular:true*/


//The directive for rendering
angular.module('wfm.appform').directive('appformFieldDate', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field-date.tpl.html')
    , controller: 'FieldDateController'
    , controllerAs: 'fieldDateCtrl'
  };
});