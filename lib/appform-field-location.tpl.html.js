var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-location.tpl.html',
    '<p class="md-caption">{{field.props.name}}</p>\n' +
    '<p>{{field.props.helpText}}</p>\n' +
    '  <md-button ng-click="ctrl.setLocation()" class="md-raised md-primary">\n' +
    '    <md-icon md-font-set="material-icons">location_searching</md-icon>\n' +
    '    Get Location\n' +
    '  </md-button>\n' +
    '\n' +
    '  <div layout layout="column">\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Latitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="ctrl.model.lat"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '    \n' +
    '    <div ng-messages="fieldForm.inputNameX.$error" ng-show="submitted || fieldForm.inputName.$dirty">\n' +
    '      <div ng-message="required">A {{field.props.name}} latitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="ctrl.model.long"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '    <div ng-messages="fieldForm.inputNameY.$error" ng-show="submitted || fieldForm.inputName.$dirty">\n' +
    '      <div ng-message="required">A {{field.props.name}} longitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '');
}]);
