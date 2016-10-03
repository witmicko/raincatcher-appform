'use strict';
/*global angular:true*/

//Registering the client service with the angular module.
angular.module('wfm.appform').service('AppformsClientService', ['FeedhenryClientService', AppformsClientService]);

/**
 *
 * Appforms client service to interact with the $fh.forms Client SDK
 *
 * @returns {{}}
 * @constructor
 */
function AppformsClientService($fh) {
  return require('./appformClient')($fh);
}

module.exports = 'wfm.appform.AppformsClientService';
