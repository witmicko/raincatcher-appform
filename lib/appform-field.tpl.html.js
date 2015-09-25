var ngModule;
try {
  ngModule = angular.module('wfm.appform');
} catch (e) {
  ngModule = angular.module('wfm.appform', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/appform-field.tpl.html',
    '<div class="form-group" ng-class="{ \'has-error\' : workorderForm.finishDate.$invalid && !workorderForm.finishDate.$pristine }">\n' +
    '  <label for="inputFinishDate" class="col-sm-2 control-label">{{ctrl.field.name}}</label>\n' +
    '  <div class="col-sm-10">\n' +
    '    <input type="{{ctrl.field.type}}" class="form-control" id="inputFinishDate" name="finishDate" ng-model="ctrl.model.finishDate" required>\n' +
    '    <p ng-show="workorderForm.finishDate.$invalid && !workorderForm.finishDate.$pristine" class="help-block">A finish date is required.</p>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
