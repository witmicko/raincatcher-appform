var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-section.tpl.html',
    '\n' +
    '<div class="appform-section">\n' +
    '\n' +
    '  <div class="section">Section {{sectionCtrl.section.name}}</div>\n' +
    '\n' +
    '  <div ng-repeat="field in sectionCtrl.section.fields">\n' +
    '    <appform-field></appform-field>\n' +
    '  </div>\n' +
    '\n' +
    '</div>');
}]);
