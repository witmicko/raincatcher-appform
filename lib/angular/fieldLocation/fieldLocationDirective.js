
/*global angular:true*/


//The directive for rendering
angular.module('wfm.appform').directive('appformFieldLocation', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field-location.tpl.html')
    , controller: 'FieldLocationController'
    , controllerAs: 'fieldLocationCtrl'
  };
});