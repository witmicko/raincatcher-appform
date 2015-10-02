var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-mobile-field-location.tpl.html',
    '<div class="appform-field-location">\n' +
    '  <div>\n' +
    '    {{ctrl.field.props.helpText}}\n' +
    '  </div>\n' +
    '  <div>\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="ctrl.model.lat"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '      style="width: 40%; display: inline-block;"\n' +
    '    ></input>\n' +
    '    <input type="number"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="ctrl.model.long"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '      style="width: 40%; display: inline-block;"\n' +
    '    ></input>\n' +
    '    <button type="button" ng-click="ctrl.setLocation()" class="button">X</button>\n' +
    '  </div>\n' +
    '  <ng-transclude></ng-transclude>\n' +
    '</div>\n' +
    '');
}]);
