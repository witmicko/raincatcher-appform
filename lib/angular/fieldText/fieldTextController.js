
/*global angular:true*/


/**
 * The controller for the Text field directive.
 * @param $scope
 * @constructor
 */
function FieldTextController($scope) {
  var fieldTextCtrl = this;

  fieldTextCtrl.field = $scope.field;
}

angular.module('wfm.appform').controller('FieldTextController', ['$scope', FieldTextController]);