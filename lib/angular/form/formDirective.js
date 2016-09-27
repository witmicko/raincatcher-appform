//Here, we want to define the appform directive that is responsible for rendering the entire form to the user.


/*global angular:true*/

/**
 * The directive for rendering a Form
 */
angular.module('wfm.appform').directive('appform', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/appform.tpl.html')
    , controller: 'FormController'
    //Note, we use formCtrl as the name of the controller. This is represented in the view when accessing variables.
    , controllerAs: 'formCtrl',
    bindToController: true,
    scope: {
      'formid': '=',
      'submissionid': '='
    }
  };
});