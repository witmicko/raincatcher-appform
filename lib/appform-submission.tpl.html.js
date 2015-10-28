var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-submission.tpl.html',
    '\n' +
    '  <!--   <md-subheader>{{ctrl.form.props.name}}</md-subheader> -->\n' +
    '\n' +
    '<md-subheader>Suheader</md-subheader>\n' +
    '\n' +
    '<md-list class="appform-view">\n' +
    '\n' +
    '\n' +
    '  <md-list-item ng-if="! ctrl.fields" class="loading">\n' +
    '    Loading appForm submission...\n' +
    '  </md-list-item>\n' +
    '\n' +
    '\n' +
    '  <md-list-item class="md-2-line with-image">\n' +
    '    <md-icon md-font-set="material-icons">gesture</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3><img src="http://placehold.it/350x150"></h3>\n' +
    '      <p>Risk Assessment signature</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">text_format</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>John Doe</h3>\n' +
    '      <p>Name</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">filter_4</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>8252</h3>\n' +
    '      <p>Number</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '\n' +
    '  <md-list-item class="md-3-line">\n' +
    '    <md-icon md-font-set="material-icons">place</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>34.9262422, -14.82625252</h3>\n' +
    '      <p>Longitude, Latitude</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  \n' +
    '  \n' +
    '  <md-list-item class="md-2-line" ng-repeat="field in ctrl.fields">\n' +
    '    \n' +
    '    <span ng-switch="field.props.type" flex>\n' +
    '      \n' +
    '      <div ng-switch-when="signature">\n' +
    '        <img ng-if="field.value.localURI" ng-src="{{field.value.localURI}}" alt="Signature">\n' +
    '        <img ng-if="!field.value.localURI" ng-src="{{field.value.imgHeader + field.value.data}}" alt="Signature">\n' +
    '      </div>\n' +
    '      \n' +
    '      <div ng-switch-when="location">\n' +
    '        <div>{{field.props.name}}:</div>\n' +
    '        <div style="font-weight: bold">{{field.value.lat}}N {{field.value.long}}W</div>\n' +
    '      </div>\n' +
    '      \n' +
    '      \n' +
    '      <span ng-switch-default >\n' +
    '        \n' +
    '        <md-icon md-font-set="material-icons">gesture</md-icon>\n' +
    '        <div class="md-list-item-text">\n' +
    '          <h3>{{field.value}}</h3>\n' +
    '          <p>{{field.props.name}}</p>\n' +
    '        </span>\n' +
    '      \n' +
    '      </div>\n' +
    '    \n' +
    '    </span>\n' +
    '    \n' +
    '  </md-list-item>\n' +
    '\n' +
    '</md-list>\n' +
    '');
}]);
