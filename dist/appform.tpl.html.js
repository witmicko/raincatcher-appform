var ngModule;
try {
  ngModule = angular.module('wfm.appform.directives');
} catch (e) {
  ngModule = angular.module('wfm.appform.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform.tpl.html',
    '<div class="app-form" layout-padding >\n' +
    '\n' +
    '<form name="workorderForm" novalidate>\n' +
    '  <div ng-repeat="field in ctrl.fields">\n' +
    '    <appform-field field="field" model="ctrl.model[field.props.fieldCode || field.props._id]"></appform-field>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '    <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '    <md-button type="button" ng-click="ctrl.done($event, workorderForm.$valid)" class="md-primary">Continue</md-button>\n' +
    '  </div><!-- workflow-actions-->\n' +
    '\n' +
    '</form>\n' +
    '\n' +
    '</div><!-- app-form -->\n' +
    '');
}]);
