
/*global angular:true*/


function FieldTimeController($scope) {
  var fieldTimeCtrl = this;

  fieldTimeCtrl.field = $scope.field;

  fieldTimeCtrl.updateModel = function() {
    fieldTimeCtrl.field.value = new Date(fieldTimeCtrl.field.value);
  };
}

angular.module('wfm.appform').controller('FieldTimeController', ['$scope', FieldTimeController]);