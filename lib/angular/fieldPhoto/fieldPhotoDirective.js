
/*global angular:true*/


//The directive for rendering
angular.module('wfm.appform').directive('appformFieldPhoto', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform-field-photo.tpl.html')
    , controller: 'FieldPhotoController'
    , controllerAs: 'fieldPhotoCtrl'
  };
});