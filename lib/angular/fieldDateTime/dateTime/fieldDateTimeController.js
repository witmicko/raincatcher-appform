
/*global angular:true*/

//TODO: Move to service
function getDate(d) {
  return 'YYYY-MM-DD'.replace('YYYY', d.getFullYear()).replace('MM', twoDigi(d.getMonth()+1)).replace('DD', twoDigi(d.getDate()));
}

function getTime(d) {
  return 'HH:mm'.replace('HH', twoDigi(d.getHours())).replace('mm', twoDigi(d.getMinutes()));
}

function twoDigi(num) {
  if (num < 10) {
    return '0' + num.toString();
  } else {
    return num.toString();
  }
}

function FieldDateTimeController($scope) {
  var fieldDateTimeCtrl = this;

  fieldDateTimeCtrl.field = $scope.field;
  fieldDateTimeCtrl.field.value = fieldDateTimeCtrl.field.value || {};

  fieldDateTimeCtrl.updateModel = function() {
    var date = new Date(fieldDateTimeCtrl.field.value.date);
    var time = new Date(fieldDateTimeCtrl.field.value.time);
    fieldDateTimeCtrl.field.value = getDate(date) + ' ' + getTime(time);
  };
}

angular.module('wfm.appform').controller('FieldDateTimeController', ['$scope', FieldDateTimeController]);