var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-page.tpl.html',
    '<!-- Template for a single page in a forms app. It should render out all of the sections in the page -->\n' +
    '\n' +
    '<div class="appform-page">\n' +
    '\n' +
    '  <div class="page">Page {{pageCtrl.page.name}}</div>\n' +
    '\n' +
    '  <!--TODO: All fields should have sections-->\n' +
    '  <div ng-if="pageCtrl.page.sections" ng-repeat="section in pageCtrl.page.sections">\n' +
    '    <appform-section></appform-section>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-if="pageCtrl.page.fields" ng-repeat="field in pageCtrl.page.fields">\n' +
    '    <appform-field></appform-field>\n' +
    '  </div>\n' +
    '</div>');
}]);
