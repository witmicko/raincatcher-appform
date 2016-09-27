var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-text.tpm.html',
    '<md-input-container class="md-block" class="appform-field-text">\n' +
    '\n' +
    '  <label for="inputName" class="">{{fieldTextCtrl.field.name}}</label>\n' +
    '  <input type="text"\n' +
    '         placeholder="{{fieldTextCtrl.field.helpText}}"\n' +
    '         name="inputName"\n' +
    '         ng-model="fieldTextCtrl.field.value"\n' +
    '         min="{{fieldTextCtrl.field.fieldOptions.validation.min}}"\n' +
    '         max="{{fieldTextCtrl.field.fieldOptions.validation.max}}"\n' +
    '         ng-required="fieldTextCtrl.field.required"\n' +
    '  >\n' +
    '</md-input-container>\n' +
    '');
}]);
