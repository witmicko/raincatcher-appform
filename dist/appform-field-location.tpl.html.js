var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-location.tpl.html',
    '<p class="md-caption">{{fieldLocationCtrl.field.name}}</p>\n' +
    '<p>{{fieldLocationCtrl.field.helpText}}</p>\n' +
    '\n' +
    '<md-button type="button" ng-click="fieldLocationCtrl.setLocation($event)" class="md-raised md-primary">\n' +
    '  <md-icon md-font-set="material-icons">location_searching</md-icon>\n' +
    '  Get Location\n' +
    '</md-button>\n' +
    '\n' +
    '<div layout="row">\n' +
    '  <md-input-container class="appform-field-location md-block" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Latitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="fieldLocationCtrl.field.value.lat"\n' +
    '      ng-required="fieldLocationCtrl.field.required"\n' +
    '    >\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-input-container class="appform-field-location md-block" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="fieldLocationCtrl.field.value.long"\n' +
    '      ng-required="fieldLocationCtrl.field.required"\n' +
    '    >\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '');
}]);
