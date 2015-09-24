var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-view.tpl.html',
    '<div class="appform-view">\n' +
    '  <dl class="dl-horizontal">\n' +
    '    <dt ng-repeat-start="field in ctrl.fields">{{field.name}}</dt>\n' +
    '    <dd ng-repeat-end>{{field.type}}</dd>\n' +
    '  </dl>\n' +
    '</div>\n' +
    '');
}]);
