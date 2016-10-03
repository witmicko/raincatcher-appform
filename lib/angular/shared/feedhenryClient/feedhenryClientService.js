'use strict';
/*global window angular*/

//Registering the client service with the angular module.
angular.module('wfm.appform').service('FeedhenryClientService', [FeedhenryClientService]);

/**
 *
 * A service wrapping around the feedhenry client SDK
 *
 * @returns {{}}
 * @constructor
 */
function FeedhenryClientService() {
  return window.$fh;
}

module.exports = 'wfm.appform.FeedhenryClientService';
