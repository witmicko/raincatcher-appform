'use strict';

var q = require('q');
var testHelper = {};

testHelper.startLoggingNotifications = function(mediator) {
  var topic = 'appform';
  var subscription = mediator.subscribe(topic, function(event) {
    console.log('\x1b[36m%s\x1b[0m', '** sync event:', event.dataset_id, ':', event.code, ':',  event.message);
  });
  console.log('Listening for events on topic:', topic);
}

testHelper.stopLoggingNotifications = function(mediator) {
  var topic = 'appform';
  mediator.remove(topic);
  console.log('Stopped listnering for events on topic:', topic);
}

module.exports = testHelper;
