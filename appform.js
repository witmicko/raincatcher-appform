'use strict';

var angular = require('angular');
var _ = require('lodash');

var ngModule = angular.module('wfm.appform', ['wfm.core.mediator']);

require('./lib');

var formInitPromise;

ngModule.run(function($q) {
  var deferred = $q.defer();
  $fh.on('fhinit', function(err, host) {
    $fh.forms.init(function(err, res) {
      if (err) {
        deferred.reject(err);
      } else {
        console.log('Forms initialized. ', res);
        deferred.resolve(res);
      }
    });
  });
  formInitPromise = deferred.promise;
})

ngModule.run(function($q, mediator) {
  mediator.subscribe('wfm:appform:forms:load', function() {
    formInitPromise.then(function() {
      $fh.forms.getForms(function(err, formsModel) {
        // console.log('Forms retrieved.', err, formsModel);
        var forms = formsModel.props.forms;
        mediator.publish('wfm:appform:forms:loaded', forms);
      });
    });
  });

  mediator.subscribe('wfm:appform:form:load', function(formId) {
    formInitPromise.then(function() {
      $fh.forms.getForm({formId: formId}, function (err, form) {
        // console.log('Retrieved form.', err, form);
        mediator.publish('wfm:appform:form:loaded', form);
      });
    });
  });
});

ngModule.directive('appformView', function($templateCache, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-view.tpl.html')
  , scope: {
      form: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.fields = $scope.form.fields;
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformPortal', function($templateCache, $q, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-portal.tpl.html')
  , scope: {
      form: '=value'
    }
  , controller: function($scope) {
      var self = this;
      var form = $scope.form;
      self.fields = form.fields;
      self.model = {};
      _.forEach(self.fields, function(field) {
        self.model[field.props.fieldCode || field.props._id] = {};
      });
      self.done = function(isValid) {
        if (isValid) {
          $scope.$broadcast('parentFormSubmitted');
          // console.log('Form model', self.model);
          var submission = form.newSubmission();
          var qs = [];
          _.forEach(self.fields, function(field) {
            var q = $q.defer();
            qs.push($q.promise);
            var value = self.model[field.props.fieldCode || field.props._id].value;
            submission.addInputValue({
              fieldId: field.props._id,
              value: value
            }, function(err, res) {
              if (err) {
                $q.reject(err);
              } else {
                $q.resolve(res);
              }
            });
          });
          $q.all(qs).then(function() {
            submission.submit(function(err, res) {
              console.log('Submission results', err, res);
              submission.upload(function(err, res) {
                console.log('Upload results', err, res);
              });
            }, function(err) {
              console.err(err);
            });
          });
        };
      }
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformField', function($templateCache, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field.tpl.html')
  , link: function (scope, element, attrs, ctrl) {
      var parentForm = element.parent();
      while (parentForm && parentForm.prop('tagName') !== 'FORM') {
        parentForm = parentForm.parent();
      };
      if (parentForm) {
        var formController = element.find('ng-form').controller('form');
        scope.$on('parentFormSubmitted',function(event) {
          ctrl.submit(element);
          formController.$setSubmitted();
        });
      };
      var input = element.find('input');
      if (scope.field.props.type === 'number') {
        $timeout(function() {
          var digits = Math.max(scope.field.props.fieldOptions.validation.max.toString().length, scope.field.props.fieldOptions.validation.min.toString().length);
          if (digits) {
            digits = digits + 6;
            element.find('input').css('width', digits + 'ex');
          }
        });
      }
      input.attr()
    }
  , scope: {
      field: '=',
      model: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.field = $scope.field;
      self.inputType = ['text', 'number', 'date'].indexOf(self.field.type) > -1 ? self.field.type : 'text'
      self.model = $scope.model && $scope.model.value ? angular.copy($scope.model.value) : {};
      if (self.field.props.fieldOptions.definition && self.field.props.fieldOptions.definition.defaultValue) {
        self.model = self.field.props.fieldOptions.definition.defaultValue;
      };
      self.submit = function(element) {
        if (self.field.props.type === 'signature') {
          var canvas = element[0].getElementsByTagName('canvas')[0];
          self.model = canvas.toDataURL();
        } else if (self.field.props.type === 'location') {
          var inputs = element[0].getElementsByTagName('input');
          self.model = {
            lat: inputs[0].value,
            long: inputs[1].value
          }
        }
        $scope.model.value = self.model;
      }
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformFieldLocation', function($templateCache, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field-location.tpl.html')
  , link: function (scope, element, attrs, ctrl) {
    }
  , scope: {
      field: '=',
      model: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.field = $scope.field;
      self.model = $scope.model;
      self.getLocation = function() {
        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.$apply(function() {
            self.model = {
              lat: pos.coords.latitude,
              long: pos.coords.longitude
            };
          });
        }, function(err) {
          alert('Unable to get current position');
          self.model.lat = -1;
          self.model.long = -1;
        });
      }
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformFieldNumber', function($templateCache, $window, $document, $timeout, mediator) {
  return {
    restrict: 'E'
  , template: $templateCache.get('wfm-template/appform-field-number.tpl.html')
  , link: function (scope, element, attrs, ctrl) {
      var input = element.find('input');
      $timeout(function() {
        var digits = Math.max(scope.field.props.fieldOptions.validation.max.toString().length, scope.field.props.fieldOptions.validation.min.toString().length);
        if (digits) {
          digits = digits + 6;
          element.find('input').css('width', digits + 'ex');
        }
      });
    }
  , scope: {
      field: '=',
      model: '=value'
    }
  , controller: function($scope) {
      var self = this;
      self.field = $scope.field;
      self.model = $scope.model;
      if (self.field.props.fieldOptions.definition && self.field.props.fieldOptions.definition.defaultValue) {
        self.model = parseFloat(self.field.props.fieldOptions.definition.defaultValue);
      };
    }
  , controllerAs: 'ctrl'
  };
});

ngModule.directive('appformFieldSignature', function($templateCache, $window, $document, mediator) {

  var CanvasDrawrMouse = function (element, options) {
    var canvas = element[0].getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext("2d");
    canvas.style.width = '100%';
    canvas.width = (window.innerWidth);
    canvas.height = 200;
    canvas.style.width = '';

    // set props from options, but the defaults are for the cool kids
    ctx.lineWidth = options.size || 5;
    ctx.lineCap = options.lineCap || "round";
    options.color = options.color || 'blue';

    // last known position
    var pos = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', setPosition);

    // new position from mouse event
    function setPosition(e) {
      e.preventDefault();
      e.stopPropagation();
      var rect = canvas.getBoundingClientRect();
      var offset = {
        top: rect.top,
        left: rect.left
      };
      pos.x = e.clientX - offset.left;
      pos.y = e.clientY - offset.top;
    }

    function draw(e) {
      e.preventDefault();
      e.stopPropagation();
      // mouse left button must be pressed
      if (e.buttons !== 1) return;

      ctx.beginPath(); // begin

      ctx.strokeStyle = options.color;

      ctx.moveTo(pos.x, pos.y); // from

      var rect = canvas.getBoundingClientRect();
      var offset = {
        top: rect.top,
        left: rect.left
      };
      pos.x = e.clientX - offset.left;
      pos.y = e.clientY - offset.top;
      ctx.lineTo(pos.x, pos.y); // to

      ctx.stroke(); // draw it!

    }
  };

  var CanvasDrawr = function(element, options) {
    var canvas = element[0].getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    canvas.style.width = '100%'
    canvas.width = canvas.offsetWidth;
    canvas.style.width = '';

    // set props from options, but the defaults are for the cool kids
    ctx.lineWidth = options.size || 5;
    ctx.lineCap = options.lineCap || 'round';
    options.color = options.color || 'blue';
    ctx.pX = undefined;
    ctx.pY = undefined;

    var lines = [,,];
    var rect = canvas.getBoundingClientRect();

    var offset = {
      top: rect.top + $document[0].body.scrollTop,
      left: rect.left + $document[0].body.scrollLeft
    };

    var self = {
      //bind click events
      init: function() {
        // use anguler.element#on for automatic listener cleanup
        var canvasNg = angular.element(canvas);
        //set pX and pY from first click
        canvasNg.on('touchstart', self.preDraw);
        canvasNg.on('touchmove', self.draw);
        canvasNg.on('touchend', function(event) {
          $ionicScrollDelegate.freezeAllScrolls(false);
        });
      },

      preDraw: function(event) {
        $ionicScrollDelegate.freezeAllScrolls(true);
        rect = canvas.getBoundingClientRect();
        offset = {
          top: rect.top + $document[0].body.scrollTop,
          left: rect.left + $document[0].body.scrollLeft
        };

        for (var i = 0; i < event.touches.length; i++) {
          var touch = event.touches[i];
          var id      = touch.identifier;

          lines[id] = {
            x     : touch.pageX - offset.left,
            y     : touch.pageY - offset.top,
            color : options.color
          };
        };
        event.preventDefault();
        event.cancelBubble = true;
      },

      draw: function(event) {
        for (var i = 0; i < event.touches.length; i++) {
          var touch = event.touches[i];
          var id = touch.identifier,

          moveX = touch.pageX - offset.left - lines[id].x,
          moveY = touch.pageY - offset.top - lines[id].y;

          var ret = self.move(id, moveX, moveY);
          lines[id].x = ret.x;
          lines[id].y = ret.y;
        };

        event.preventDefault();
      },

      move: function(i, changeX, changeY) {
        ctx.strokeStyle = lines[i].color;
        ctx.beginPath();
        ctx.moveTo(lines[i].x, lines[i].y);

        ctx.lineTo(lines[i].x + changeX, lines[i].y + changeY);
        ctx.stroke();
        ctx.closePath();

        return { x: lines[i].x + changeX, y: lines[i].y + changeY };
      }
    };

    return self.init();
  }

  return {
    restrict: 'E'
  , template: '<div class="appform-signature-field"><canvas></canvas></div>'
  , scope: {
      options: '='
    }
  , link: function (scope, element, attrs) {
      var options = scope.options || {};
      var drawr = new CanvasDrawrMouse(element, options);
    }
  };
})

module.exports = 'wfm.appform';
