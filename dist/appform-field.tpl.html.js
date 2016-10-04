var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field.tpl.html',
    '<!--\n' +
    ' Parent view for rendering all of the field types.\n' +
    '-->\n' +
    '\n' +
    '<div ng-switch="fieldCtrl.field.type">\n' +
    '  <div ng-switch-when="number">\n' +
    '    <appform-field-number></appform-field-number>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-switch-when="text">\n' +
    '    <appform-field-text></appform-field-text>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-switch-when="dateTime" ng-switch="fieldCtrl.field.fieldOptions.definition.datetimeUnit">\n' +
    '    <div ng-switch-when="date">\n' +
    '      <appform-field-date></appform-field-date>\n' +
    '    </div>\n' +
    '    <div ng-switch-when="datetime">\n' +
    '      <appform-field-datetime></appform-field-datetime>\n' +
    '    </div>\n' +
    '    <div ng-switch-when="time">\n' +
    '      <appform-field-time></appform-field-time>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-switch-when="location">\n' +
    '    <appform-field-location></appform-field-location>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-switch-when="signature" flex class="appform-signature">\n' +
    '    <md-input-container class="md-block">\n' +
    '      <p class="md-caption">{{fieldCtrl.field.name}}</p>\n' +
    '      <signature-form value="fieldCtrl.field.value"></signature-form>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-switch-when="photo" flex class="appform-photo">\n' +
    '    <appform-field-photo></appform-field-photo>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
