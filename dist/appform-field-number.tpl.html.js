var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-number.tpl.html',
    '<md-input-container class="md-block" class="appform-field-number">\n' +
    '\n' +
    '  <label for="inputName" class="">{{fieldNumberCtrl.field.name}}</label>\n' +
    '  <input type="number"\n' +
    '    name="inputName"\n' +
    '    ng-model="fieldNumberCtrl.field.value"\n' +
    '    min="{{fieldNumberCtrl.field.fieldOptions.validation.min}}"\n' +
    '    max="{{fieldNumberCtrl.field.fieldOptions.validation.max}}"\n' +
    '    ng-required="fieldNumberCtrl.field.required",\n' +
    '         ng-change="fieldNumberCtrl.field.updateValue()"\n' +
    '  >\n' +
    '</md-input-container>\n' +
    '');
}]);
