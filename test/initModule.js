var angular = require('angular');

/**
 * Small function to use an exising wfm.appform module for tests or to create another.
 */
module.exports = function initModule() {
  try {
    angular.module('wfm.appform');
  } catch (e) {
    angular.module('wfm.appform', []);
  }
};