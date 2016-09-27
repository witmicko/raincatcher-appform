'use strict';
/*global angular:true*/


var client = {};

//Registering the client service with the angular module.
angular.module('wfm.appform').service('AppformsClientService', [AppformsClientService]);

/**
 *
 * Appforms client service to interact with the $fh.forms Client SDK
 *
 * @returns {{}}
 * @constructor
 */
function AppformsClientService() {
  return require('./appformClient');
}

module.exports = client;
