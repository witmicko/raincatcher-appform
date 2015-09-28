var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field-location.tpl.html',
    '<div class="appform-field-location">\n' +
    '  <div class="col-sm-12">\n' +
    '    {{ctrl.field.props.helpText}}\n' +
    '  </div>\n' +
    '  <div class="col-sm-5">\n' +
    '    <input type="text"\n' +
    '      class="form-control"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameX"\n' +
    '      ng-model="ctrl.model.lat"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '  </div>\n' +
    '  <div class="col-sm-5">\n' +
    '    <input type="text"\n' +
    '      class="form-control"\n' +
    '      placeholder="Longitude"\n' +
    '      name="inputNameY"\n' +
    '      ng-model="ctrl.model.long"\n' +
    '      ng-required="ctrl.field.props.required"\n' +
    '    ></input>\n' +
    '  </div>\n' +
    '  <div class="col-sm-2">\n' +
    '    <button ng-click="ctrl.getLocation()">X</button>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
