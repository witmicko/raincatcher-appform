
/*global angular:true*/


/**
 *
 * Controller for the Number field directive
 *
 * @param $scope
 * @constructor
 */
function FieldNumberController($scope) {
  var fieldNumberCtrl = this;

  fieldNumberCtrl.field = $scope.field;
}

angular.module('wfm.appform').controller('FieldNumberController', ['$scope', FieldNumberController]);