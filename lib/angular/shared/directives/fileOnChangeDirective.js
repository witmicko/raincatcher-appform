
/*global angular:true*/


/**
 * The directive for handling input change on file type.
 */

angular.module('wfm.appform').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});