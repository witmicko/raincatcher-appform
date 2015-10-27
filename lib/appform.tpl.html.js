var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform.tpl.html',
    '<div class="app-form" layout-padding layout-margin>\n' +
    '\n' +
    '<form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate>\n' +
    '  <div ng-repeat="field in ctrl.fields">\n' +
    '    <appform-field field="field" value="ctrl.model[field.props.fieldCode || field.props._id]"></appform-field>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '    <md-button class="md-primary md-hue-1">Back</md-button>\n' +
    '    <md-button type="submit" class="md-primary">Continue</md-button>\n' +
    '  </div><!-- workflow-actions-->\n' +
    '\n' +
    '</form>\n' +
    '\n' +
    '</div><!-- app-form -->\n' +
    '');
}]);
