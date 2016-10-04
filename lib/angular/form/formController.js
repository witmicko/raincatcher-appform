
/*global angular:true*/


/**
 * The controller for the Form directive.
 *
 * This controller manages getting the form from the $fh.forms API using the AppformsClientService
 *
 * TODO: Implement Submission and Back Commands.
 *
 * @param $scope
 * @param AppformsClientService
 * @constructor
 */
function FormController($scope, AppformsClientService) {
  var formCtrl = this;

  //TODO: mediator should be a service.
  formCtrl.submit = function() {
    console.log("Submitting form", formCtrl.submission);
  };

  formCtrl.back = function() {
    console.log("Back");
  };

  //Getting a form from the $fh.forms Client API
  var formPromise = AppformsClientService.getForm(formCtrl.formid);
  formPromise.then(function(form) {

    //Creating a new submission for the form to bind to the page, section and field view etc.
    AppformsClientService.createNewSubmission(form).then(function(submission) {
      $scope.$apply(function() {
        formCtrl.submission = submission;
        formCtrl.form = submission.submissionState;
      });
    });
  }, function(error) {
    console.error("Error Loading Form", error);
  });
}

angular.module('wfm.appform').controller('FormController', ['$scope', 'AppformsClientService', FormController]);