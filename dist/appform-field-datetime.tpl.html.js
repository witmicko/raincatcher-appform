var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-datetime.tpl.html',
    '\n' +
    '<p class="md-caption">{{fieldDateCtrl.field.name}}</p>\n' +
    '<div layout="row">\n' +
    '  <md-input-container flex class="md-block" class="appform-field-number">\n' +
    '    <label for="inputDate" class="">Date</label>\n' +
    '    <input type="date"\n' +
    '      placeholder="{{fieldDateCtrl.field.helpText}}"\n' +
    '      name="inputDate"\n' +
    '      ng-model="fieldDateCtrl.field.value.date"\n' +
    '      ng-change="fieldDateCtrl.updateModel()"\n' +
    '      min="{{fieldDateCtrl.field.fieldOptions.validation.min}}"\n' +
    '      max="{{fieldDateCtrl.field.fieldOptions.validation.max}}"\n' +
    '      ng-required="fieldDateCtrl.field.required"\n' +
    '    >\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-input-container flex class="md-block" class="appform-field-number">\n' +
    '    <label for="inputTime" class="">Time</label>\n' +
    '    <input type="time"\n' +
    '           placeholder="{{fieldDateCtrl.field.helpText}}"\n' +
    '           name="inputTime"\n' +
    '           ng-model="fieldDateCtrl.field.value.time"\n' +
    '           ng-change="fieldDateCtrl.updateModel()"\n' +
    '           min="{{fieldDateCtrl.field.fieldOptions.validation.min}}"\n' +
    '           max="{{fieldDateCtrl.field.fieldOptions.validation.max}}"\n' +
    '           ng-required="fieldDateCtrl.field.required"\n' +
    '    >\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '');
}]);
