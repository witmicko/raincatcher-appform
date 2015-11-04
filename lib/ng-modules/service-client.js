'use strict';

var client = require('../appform-client')

module.exports = 'wfm.appform.service';

angular.module('wfm.appform.service', [])

.service('appformClient', function($q) {
  service = {};

  service.init = function() { return $q.when(client.init(args)); }
  service.list = function() { return $q.when(client.list(args)); }
  service.getForm = function() { return $q.when(client.getForm(args)); }
  service.getSubmissionLocal = function() { return $q.when(client.getSubmissionLocal(args)); }
  service.getSubmission = function() { return $q.when(client.getSubmission(args)); }
  service.getFields = function() { return $q.when(client.getFields(args)); }

  return service;
});

module.exports = 'wfm.appform';
