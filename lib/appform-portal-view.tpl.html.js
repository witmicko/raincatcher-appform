var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-portal-view.tpl.html',
    '<div class="appform-view">\n' +
    '  \n' +
    '</div>\n' +
    '');
}]);
