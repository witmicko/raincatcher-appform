var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-portal-field-number.tpl.html',
    '<div class="appform-field-number">\n' +
    '  <input type="number"\n' +
    '    class="form-control"\n' +
    '    placeholder="{{ctrl.field.props.helpText}}"\n' +
    '    name="inputName"\n' +
    '    ng-model="ctrl.model"\n' +
    '    min="{{field.props.fieldOptions.validation.min}}"\n' +
    '    max="{{field.props.fieldOptions.validation.max}}"\n' +
    '    ng-required="ctrl.field.props.required"\n' +
    '  ></input>\n' +
    '  <p ng-show="fieldForm.inputName.$error.max" class="help-block">Value must be less than {{field.props.fieldOptions.validation.max}}.</p>\n' +
    '  <p ng-show="fieldForm.inputName.$error.min" class="help-block">Value must be larger than {{field.props.fieldOptions.validation.min}}.</p>\n' +
    '  <p ng-show="fieldForm.inputName.$error.required && !fieldForm.inputName.$pristine" class="help-block">A {{ctrl.field.props.name}} is required.</p>\n' +
    '</div>\n' +
    '');
}]);
