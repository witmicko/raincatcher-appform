
/* globals inject */

var angular = require('angular');
var should = require('should');
require('angular-mocks');

describe('Number Field Controller', function() {

  //Setting up a mock module to test.
  before(function() {
    angular.module('wfm.appform', []);

    //The number controller is the controller under test.
    require('./fieldNumberController');
  });

  beforeEach(function() {
    angular.mock.module('wfm.appform');
  });

  beforeEach(inject(function(_$controller_) {
    this.$controller = _$controller_;
  }));

  it("The field should be set from the parent scope", inject(function($rootScope) {
    //Setting up a new mock $scope.
    var $scope = $rootScope.$new();

    //Setting a mock field
    $scope.field = {
      "_id": "numberfieldid",
      "name": "Number Field"
    };

    var controller = this.$controller('FieldNumberController', { $scope: $scope});

    //The field from the parent scope should be bound to the controller scope.
    should(controller.field).equal($scope.field);
  }));
});