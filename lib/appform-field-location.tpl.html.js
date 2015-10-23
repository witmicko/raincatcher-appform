var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-location.tpl.html',
    '<label>{{field.props.name}}</label>\n' +
    '<p>{{field.props.helpText}}</p>\n' +
    '<div layout="row">\n' +
    '  <div>\n' +
    '    <md-button type="button" ng-click="ctrl.setLocation()" class="md-icon-button md-raised md-primary"><md-icon md-font-set="material-icons">location_searching</md-icon></md-button>\n' +
    '  </div>\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location" flex="40">\n' +
    '    <input type="number"\n' +
    '      placeholder="Latitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="ctrl.model.lat"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '      style="width: 90%;"\n' +
    '    ></input>\n' +
    '    <div ng-messages="fieldForm.inputNameX.$error" ng-show="ctrl.submitted || fieldForm.inputName.$dirty">\n' +
    '      <div ng-message="required">A {{field.props.name}} latitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location" flex="40">\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="ctrl.model.long"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '      style="width: 90%;"\n' +
    '    ></input>\n' +
    '    <div ng-messages="fieldForm.inputNameY.$error" ng-show="ctrl.submitted || fieldForm.inputName.$dirty">\n' +
    '      <div ng-message="required">A {{field.props.name}} longitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '');
}]);
