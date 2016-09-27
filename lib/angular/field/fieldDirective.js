
/*global angular:true*/

angular.module('wfm.appform').directive('appformField', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field.tpl.html')
    , controller: 'FieldController'
    , controllerAs: 'fieldCtrl'
  };
});