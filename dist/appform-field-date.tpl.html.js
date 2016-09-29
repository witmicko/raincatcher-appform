var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-date.tpl.html',
    '\n' +
    '<md-input-container class="md-block" class="appform-field-number">\n' +
    '  <label for="inputDate" class="">{{fieldDateCtrl.field.name}}</label>\n' +
    '  <input type="date"\n' +
    '    placeholder="{{fieldDateCtrl.field.helpText}}"\n' +
    '    name="inputDate"\n' +
    '    ng-model="fieldDateCtrl.field.value"\n' +
    '    ng-change="fieldDateCtrl.updateModel()"\n' +
    '    min="{{fieldDateCtrl.field.fieldOptions.validation.min}}"\n' +
    '    max="{{fieldDateCtrl.field.fieldOptions.validation.max}}"\n' +
    '    ng-required="fieldDateCtrl.field.required"\n' +
    '  >\n' +
    '</md-input-container>\n' +
    '');
}]);
