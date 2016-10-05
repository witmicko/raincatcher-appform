/*global angular:true*/


/**
 * The directive for rendering a File field Type.
 */
angular.module('wfm.appform').directive('appformFieldFile', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field-file.tpl.html')
    , controller: 'FieldFileController'
    , controllerAs: 'fieldFileCtrl'
  };
});