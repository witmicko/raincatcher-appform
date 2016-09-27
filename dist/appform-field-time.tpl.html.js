var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-time.tpl.html',
    '\n' +
    '<md-input-container class="md-block" class="appform-field-number">\n' +
    '  <label for="inputTime" class="">{{fieldTimeCtrl.field.name}}</label>\n' +
    '  <input type="time"\n' +
    '    placeholder="{{fieldTimeCtrl.field.helpText}}"\n' +
    '    name="inputTime"\n' +
    '    ng-model="fieldTimeCtrl.field.value"\n' +
    '    ng-change="fieldTimeCtrl.updateModel()"\n' +
    '    ng-required="fieldTimeCtrl.field.required"\n' +
    '  >\n' +
    '</md-input-container>\n' +
    '');
}]);
