var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-portal.tpl.html',
    '<div class="appform-portal">\n' +
    '  <div class="panel panel-default">\n' +
    '    <div class="panel-heading"><h3>App form</h3></div>\n' +
    '    <div class="panel-body">\n' +
    '      <form class="form-horizontal" name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate>\n' +
    '        {{ctrl.model}}\n' +
    '        <div ng-repeat="field in ctrl.fields">\n' +
    '          <appform-field field="field" value="ctrl.model[field.props.fieldCode || field.props._id]"></appform-field>\n' +
    '        </div>\n' +
    '\n' +
    '        <button type="submit" class="btn btn-primary" ng-disabled="workorderForm.$invalid">Save Workorder</button>\n' +
    '      </form>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
