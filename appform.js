'use strict';

module.exports = 'wfm.appform';

angular.module('wfm.appform', [
  'wfm.core.mediator'
, require('./lib/ng-modules/directives')
])

.run(function(mediator) {
  require('./lib/wrappers/mediator-client')(mediator);
});
