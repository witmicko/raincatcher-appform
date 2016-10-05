var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-file.tpl.html',
    '<!--\n' +
    '\n' +
    'The template for rendering a File field into the form.\n' +
    'Note here that the ng-change directive is bound to the fieldFileCtrl.field.updateValue function.\n' +
    ' This function is internal to the field definition in the Submission Model.\n' +
    '\n' +
    ' Any values that are to be applied to the submission for this field should use that function.\n' +
    '-->\n' +
    '\n' +
    '<md-input-container class="md-block" class="appform-field-File">\n' +
    '  <label for="inputFile" class="">{{fieldFileCtrl.field.name}}</label>\n' +
    '  <input type="file"\n' +
    '         name="inputFile"\n' +
    '         ng-model="fieldFileCtrl.field.value"\n' +
    '         ng-required="fieldFileCtrl.field.required"\n' +
    '         custom-on-change="fieldFileCtrl.setFile"\n' +
    '  >\n' +
    '</md-input-container>\n' +
    '');
}]);
