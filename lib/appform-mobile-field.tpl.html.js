var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-mobile-field.tpl.html',
    '<ng-form name="fieldForm" ng-submit="ctrl.submit()">\n' +
    '  <div class="form-group {{ctrl.field.props.fieldCode}}" ng-class="{ \'has-error\' : fieldForm.inputName.$invalid && !fieldForm.inputName.$pristine }">\n' +
    '    <label for="inputName" class="item item-input">\n' +
    '      <div ng-switch="ctrl.field.props.type" style="display: flex; flex-grow: 1;">\n' +
    '        <div ng-switch-when="number">\n' +
    '          <span class="input-label">{{ctrl.field.props.name}}</span>\n' +
    '          <appform-portal-field-number value="ctrl.model" field="ctrl.field"></appform-portal-field-number>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="location">\n' +
    '          <appform-mobile-field-location value="ctrl.model" field="ctrl.field">\n' +
    '            <p ng-show="!fieldForm.inputNameX.$valid"\n' +
    '              class="help-block"\n' +
    '              >A {{ctrl.field.props.name}} is required</p>\n' +
    '          </appform-mobile-field-location>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="signature" style="display: flex; flex-grow: 1;">\n' +
    '          <appform-mobile-field-signature style="display: flex; flex-grow: 1;"></appform-mobile-field-signature>\n' +
    '        </div>\n' +
    '        <div ng-switch-default>\n' +
    '          <span class="input-label">{{ctrl.field.props.name}}</span>\n' +
    '          <input\n' +
    '            type="text"\n' +
    '            placeholder="{{ctrl.field.props.helpText}}"\n' +
    '            name="inputName"\n' +
    '            ng-model="ctrl.model"\n' +
    '            ng-required="ctrl.field.props.required"\n' +
    '          ></input>\n' +
    '          <p ng-show="!fieldForm.inputName.$valid && !fieldForm.inputName.$pristine" class="help-block">A {{ctrl.field.props.name}} is required.</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </label>\n' +
    '  </div>\n' +
    '</ng-form>\n' +
    '');
}]);
