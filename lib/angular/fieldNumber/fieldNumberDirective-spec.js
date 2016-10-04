/* globals inject */

var angular = require('angular');
var should = require('should');
var sinon = require('sinon');
require('angular-mocks');
var initModule = require('../../../test/initModule');

describe("Number Field Directive", function() {

  before(function() {
    initModule();

    //The number directive is the directive under test.
    require('./fieldNumberController');
    require('./fieldNumberDirective');

    //Requiring all of the templates to be able to render the html
    //TODO: Look into a better way of organising templates.
    require('../../../dist');
  });

  beforeEach(angular.mock.module('wfm.appform'));

  beforeEach(function() {
    var self = this;

    inject(function($rootScope, $compile) {
      self.scope = $rootScope.$new();

      self.element = "<appform-field-number></appform-field-number>";

      //The function that is executed whenever a value changes.
      self.updateValueSpy = sinon.spy();

      //Setting A dummy field on the controller scope.
      self.scope.field = {
        _id: "numberfieldid",
        name: "Number Field",
        updateValue: self.updateValueSpy
      };

      self.element = $compile(self.element)(self.scope);
      self.scope.$digest();

      self.element.data('$appformFieldNumberController', {});
      self.fieldNumberCtrl = self.element.scope().fieldNumberCtrl;
    });
  });

  it("There should only be one input element", function() {
    should(this.element.find('input').length).equal(1);
  });

  it("It should be a number eleemnt", function() {
    should(this.element.find('input').attr('type')).equal('number');
  });

  it("The model should be set to fieldNumberCtrl.field.value", function() {
    should(this.element.find('input').attr('ng-model')).equal('fieldNumberCtrl.field.value');
  });

  it("Setting a value on the scope should give set a default value", function() {
    var self = this;
    self.fieldNumberCtrl.field.value = 23;
    self.scope.$apply();

    should(parseInt(self.element.find('input').val())).equal(23);
  });

});