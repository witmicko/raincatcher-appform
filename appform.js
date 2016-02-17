/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

module.exports = 'wfm.appform';

angular.module('wfm.appform', [
  'wfm.core.mediator'
, require('./lib/ng-modules/directives')
])

.run(function(mediator) {
  require('./lib/wrappers/mediator-client')(mediator);
});
