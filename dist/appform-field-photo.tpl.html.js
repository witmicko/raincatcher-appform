var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-photo.tpl.html',
    '<div>\n' +
    '  <md-button type="button" ng-click="fieldPhotoCtrl.capture($event)" class="md-raised md-primary">{{fieldPhotoCtrl.field.value ? \'Replace\' : \'Take a\'}} photo</md-button>\n' +
    '  <br>\n' +
    '  <img class=\'appform-photo\' ng-if="fieldPhotoCtrl.field.value.localURI" ng-src="{{fieldPhotoCtrl.field.value.localURI}}" alt="photo">\n' +
    '  <img class=\'appform-photo\' ng-if="fieldPhotoCtrl.field.value" ng-src="{{fieldPhotoCtrl.field.value}}" alt="photo">\n' +
    '</div>\n' +
    '');
}]);
