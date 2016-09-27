/*global angular:true*/


/**
 *
 * Controller function for all of the field types.
 *
 * @param $scope
 * @constructor
 */
function FieldController($scope) {
  var fieldCtrl = this;


  fieldCtrl.field = $scope.field;
}

angular.module('wfm.appform').controller('FieldController', ['$scope', FieldController]);