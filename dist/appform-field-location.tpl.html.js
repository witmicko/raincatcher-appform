var ngModule;
try {
  ngModule = angular.module('wfm.appform.directives');
} catch (e) {
  ngModule = angular.module('wfm.appform.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-location.tpl.html',
    '<p class="md-caption">{{field.props.name}}</p>\n' +
    '<p>{{field.props.helpText}}</p>\n' +
    '\n' +
    '<md-button type="button" ng-click="ctrl.setLocation($event)" class="md-raised md-primary">\n' +
    '  <md-icon md-font-set="material-icons">location_searching</md-icon>\n' +
    '  Get Location\n' +
    '</md-button>\n' +
    '\n' +
    '<div layout="row">\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location md-block" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Latitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="ctrl.model.value.lat"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '\n' +
    '    <div ng-messages="$parent.fieldForm.inputNameX.$error" ng-show="$parent.fieldForm.inputNameX.$dirty || $parent.fieldForm.$submitted">\n' +
    '      <div ng-message="required">A {{field.props.name}} latitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-input-container class="{{field.props.fieldCode}} appform-field-location md-block" flex>\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="ctrl.model.value.long"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '    <div ng-messages="$parent.fieldForm.inputNameY.$error" ng-show="$parent.fieldForm.inputNameY.$dirty || $parent.fieldForm.$submitted">\n' +
    '      <div ng-message="required">A {{field.props.name}} longitude is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '');
}]);
