var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform.tpl.html',
    '<!-- Top Level rendering of a form. This template contains all of the pages and page controls for a single form. -->\n' +
    '\n' +
    '<div class="app-form" layout-padding >\n' +
    '\n' +
    '  <div>Form: {{ formCtrl.form.name }}</div>\n' +
    '\n' +
    '  <!--<form name="workorderForm" novalidate>-->\n' +
    '\n' +
    '    <!--&lt;!&ndash; TODO: Page Numbering &ndash;&gt;-->\n' +
    '\n' +
    '    <div ng-repeat="page in formCtrl.form.pages">\n' +
    '      <appform-page></appform-page>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '      <md-button class="md-primary md-hue-1" ng-click="formCtrl.back()">Back</md-button>\n' +
    '      <md-button type="button" ng-click="formCtrl.submit()" class="md-primary">Continue</md-button>\n' +
    '    </div><!-- workflow-actions-->\n' +
    '\n' +
    '  <!--</form>-->\n' +
    '\n' +
    '</div><!-- app-form -->\n' +
    '');
}]);
