
/*global angular:true*/


/**
 * The directive for rendering a Number field Type.
 */
angular.module('wfm.appform').directive('appformFieldNumber', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field-number.tpl.html')
    , controller: 'FieldNumberController'
    , controllerAs: 'fieldNumberCtrl'
  };
});