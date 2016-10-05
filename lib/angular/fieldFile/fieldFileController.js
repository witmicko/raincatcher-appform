
/*global angular:true*/


/**
 *
 * Controller for the File field directive
 *
 * @param $scope
 * @constructor
 */
function FieldFileController($scope) {
  var fieldFileCtrl = this;
  fieldFileCtrl.field = $scope.field;

  fieldFileCtrl.setFile = function(event) {
    //get file on idx 0 - only supporting single file per field
    fieldFileCtrl.field.value = event.target.files[0];

    fieldFileCtrl.field.addFileValue(function(err, result) {
      if (err || result === undefined) {
        //should show a popup here to the user
        console.log('error uploading file ', err);
      } else {
        fieldFileCtrl.field.value = result;
      }
    });
  };
}

angular.module('wfm.appform').controller('FieldFileController', ['$scope', FieldFileController]);

module.exports = 'wfm.appform.FieldFileController';
