var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-mobile.tpl.html',
    '<div class="list">\n' +
    '  <form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate>\n' +
    '    <div ng-repeat="field in ctrl.fields">\n' +
    '      <appform-mobile-field field="field" value="ctrl.model[field.props.fieldCode || field.props._id]"></appform-mobile-field>\n' +
    '    </div>\n' +
    '    <button type="submit" class="button button-positive button-full" ng-disabled="workorderForm.$invalid">Submit</button>\n' +
    '  </form>\n' +
    '</div>\n' +
    '');
}]);
