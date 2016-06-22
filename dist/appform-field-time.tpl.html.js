var ngModule;
try {
  ngModule = angular.module('wfm.appform.directives');
} catch (e) {
  ngModule = angular.module('wfm.appform.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-time.tpl.html',
    '\n' +
    '<md-input-container class="md-block" class="{{field.props.fieldCode}} appform-field-number">\n' +
    '  <label for="inputTime" class="">{{field.props.name}}</label>\n' +
    '  <input type="time"\n' +
    '    placeholder="{{ctrl.field.props.helpText}}"\n' +
    '    name="inputTime"\n' +
    '    ng-model="ctrl.model.time"\n' +
    '    ng-change="ctrl.updateModel()"\n' +
    '    ng-required="ctrl.field.props.required"\n' +
    '  ></input>\n' +
    '  <div ng-messages="$parent.fieldForm.inputName.$error" ng-show="$parent.fieldForm.inputName.$dirty || $parent.fieldForm.$submitted">\n' +
    '    <div ng-message="required">A {{field.props.name}} is required.</div>\n' +
    '    <div ng-message="number">You did not enter a valid time</div>\n' +
    '    <div ng-message="max" class="help-block">Value must be less than {{field.props.fieldOptions.validation.max}}.</div>\n' +
    '    <div ng-message="min" class="help-block">Value must be larger than {{field.props.fieldOptions.validation.min}}.</div>\n' +
    '  </div>\n' +
    '</md-input-container>\n' +
    '');
}]);
