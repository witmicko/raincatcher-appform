var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-portal-field.tpl.html',
    '<ng-form name="fieldForm" ng-submit="ctrl.submit()">\n' +
    '  <div class="form-group {{ctrl.field.props.fieldCode}}" ng-class="{ \'has-error\' : fieldForm.inputName.$invalid && !fieldForm.inputName.$pristine }">\n' +
    '    <label for="inputName" class="col-sm-2 control-label">{{ctrl.field.props.name}}</label>\n' +
    '    <div ng-switch="ctrl.field.props.type" class="col-sm-10">\n' +
    '      <div ng-switch-when="number">\n' +
    '        <appform-field-number value="ctrl.model" field="ctrl.field"></appform-field-number>\n' +
    '      </div>\n' +
    '      <div ng-switch-when="location">\n' +
    '        <appform-field-location value="ctrl.model" field="ctrl.field"></appform-field-location>\n' +
    '      </div>\n' +
    '      <div ng-switch-when="signature">\n' +
    '        <appform-field-signature></appform-field-signature>\n' +
    '      </div>\n' +
    '      <div ng-switch-default>\n' +
    '        <input\n' +
    '          type="{{ctrl.inputType}}"\n' +
    '          class="form-control"\n' +
    '          placeholder="{{ctrl.field.props.helpText}}"\n' +
    '          name="inputName"\n' +
    '          ng-model="ctrl.model"\n' +
    '          ng-required="ctrl.field.props.required"\n' +
    '        ></input>\n' +
    '        <p ng-show="!fieldForm.inputName.$valid && !fieldForm.inputName.$pristine" class="help-block">A {{ctrl.field.props.name}} is required.</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</ng-form>\n' +
    '');
}]);
