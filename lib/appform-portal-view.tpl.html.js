var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-portal-view.tpl.html',
    '<div class="appform-view">\n' +
    '  <table class="table">\n' +
    '    <thead>\n' +
    '      <th>Name (code)<br>Id<br>Type</th>\n' +
    '      <th>JSON</th>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '      <tr ng-repeat="field in ctrl.fields">\n' +
    '        <td>{{field.props.name}} ({{field.props.fieldCode}})<br>{{field.props._id}}<br>{{field.props.type}}</td>\n' +
    '        <td><pre>{{field | json}}</pre></td>\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</div>\n' +
    '');
}]);
