var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-mobile.tpl.html',
    '<form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate>\n' +
    '  <div ng-repeat="field in ctrl.fields">\n' +
    '    <appform-mobile-field field="field" value="ctrl.model[field.props.fieldCode || field.props._id]"></appform-mobile-field>\n' +
    '  </div>\n' +
    '  <md-button type="submit" class="md-raised md-primary" ng-disabled="workorderForm.$invalid">Submit</md-button>\n' +
    '</form>\n' +
    '');
}]);
