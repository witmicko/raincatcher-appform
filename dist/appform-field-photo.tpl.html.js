var ngModule;
try {
  ngModule = angular.module('wfm.appform.directives');
} catch (e) {
  ngModule = angular.module('wfm.appform.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-photo.tpl.html',
    '<div>\n' +
    '  <md-button type="button" ng-click="ctrl.capture($event)" class="md-raised md-primary">{{ctrl.model.value ? \'Replace\' : \'Take a\'}} photo</md-button>\n' +
    '  <br>\n' +
    '  <img class=\'appform-photo\' ng-if="field.value.localURI" ng-src="{{field.value.localURI}}" alt="photo"></img>\n' +
    '  <img class=\'appform-photo\' ng-if="ctrl.model.value" ng-src="{{ctrl.model.value}}" alt="photo"></img>\n' +
    '</div>\n' +
    '');
}]);
