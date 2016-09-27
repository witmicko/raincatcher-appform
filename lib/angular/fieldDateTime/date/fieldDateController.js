
/*global angular:true*/


function FieldDateController($scope) {
  var fieldDateCtrl = this;

  fieldDateCtrl.field = $scope.field;

  fieldDateCtrl.updateModel = function() {
    fieldDateCtrl.field.value = new Date(fieldDateCtrl.field.value);
  };
}

angular.module('wfm.appform').controller('FieldDateController', ['$scope', FieldDateController]);