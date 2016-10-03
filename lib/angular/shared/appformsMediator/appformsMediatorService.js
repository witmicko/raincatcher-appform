'use strict';
/*global angular:true*/


//Registering the client service with the angular module.
angular.module('wfm.appform').service('AppformsMediatorService', ['wfm.core.mediator', 'AppformsClientService', AppformsMediatorService]);

/**
 *
 * Appforms mediator service to interact with the appforms mediator events that are fired.
 *
 * @returns {{}}
 * @constructor
 */
function AppformsMediatorService(mediator, AppformsClientService) {
  return require('./appformsMediator')(mediator, AppformsClientService);
}

module.exports = 'wfm.appform.AppformsMediatorService';
