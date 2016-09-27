
/*global angular:true navigator:true*/

function FieldLocationController($scope) {
  var fieldLocationCtrl = this;
  fieldLocationCtrl.field = $scope.field;

  if (!fieldLocationCtrl.field.values[0]) {
    fieldLocationCtrl.field.values[0] = {};
  }

  //TODO Repeating Fields
  fieldLocationCtrl.field.value = fieldLocationCtrl.field.values[0];

  fieldLocationCtrl.setLocation = function(event) {
    event.stopPropagation();

    //TODO Move it to a service to get the location
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.$apply(function() {
        fieldLocationCtrl.field.value.lat = parseFloat(pos.coords.latitude);
        fieldLocationCtrl.field.value.long = parseFloat(pos.coords.longitude);
        console.log('position set', fieldLocationCtrl.field.value);
      });
    }, function() {
      console.log("Location Not available.");
      fieldLocationCtrl.field.value.lat = -1;
      fieldLocationCtrl.field.value.long = -1;
    });
  };
}

angular.module('wfm.appform').controller('FieldLocationController', ['$scope', FieldLocationController]);