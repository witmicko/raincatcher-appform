
/*global angular:true*/

/**
 *
 * Controller for the Page directive.
 *
 * @param $scope
 * @constructor
 */
function PageController($scope) {

  this.page = $scope.page;
}

angular.module('wfm.appform').controller('PageController', ['$scope', PageController]);