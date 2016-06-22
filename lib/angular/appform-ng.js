'use strict';

module.exports = 'wfm.appform';

angular.module('wfm.appform', [
  'wfm.core.mediator'
, require('./directive')
])

.run(function(mediator) {
  require('../appform-mediator')(mediator);
});
