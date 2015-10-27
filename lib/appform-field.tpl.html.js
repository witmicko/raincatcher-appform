var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field.tpl.html',
    '<ng-form name="fieldForm" ng-submit="ctrl.submit()">\n' +
    '  <div ng-switch="ctrl.field.props.type" style="display: flex; flex-grow: 1;">\n' +
    '\n' +
    '    <div ng-switch-when="number">\n' +
    '      <appform-field-number value="ctrl.model" field="ctrl.field" form="fieldForm"></appform-field-number>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-when="location">\n' +
    '      <appform-field-location value="ctrl.model" field="ctrl.field" form="fieldForm" submitted="submitted"></appform-field-location>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-when="signature" flex class="appform-signature" form="fieldForm">\n' +
    '      <md-input-container>\n' +
    '        <p class="md-caption">{{ctrl.field.props.name}}</p>\n' +
    '        <appform-field-signature></appform-field-signature>\n' +
    '      </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-default flex>\n' +
    '      <md-input-container>\n' +
    '        <label>{{ctrl.field.props.name}}</label>\n' +
    '        <input\n' +
    '          type="text"\n' +
    '          placeholder="{{ctrl.field.props.helpText}}"\n' +
    '          name="inputName"\n' +
    '          ng-model="ctrl.model"\n' +
    '          ng-required="ctrl.field.props.required"\n' +
    '        ></input>\n' +
    '        <div ng-messages="fieldForm.inputName.$error" ng-show="submitted || fieldForm.inputName.$dirty">\n' +
    '          <div ng-message="required">A {{ctrl.field.props.name}} is required.</div>\n' +
    '        </div>\n' +
    '      </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '</ng-form>\n' +
    '');
}]);
