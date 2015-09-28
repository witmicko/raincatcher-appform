'use strict';

var $fh = require('fh-mbaas-api');

var events = require('events');
var submissionEventListener = new events.EventEmitter();

$fh.forms.registerListener(submissionEventListener, function(err){
  if (err) {
    console.err(err);
  };

  //submissionEventListener has now been registered with the $fh.forms Cloud API. Any valid Forms Events will now emit.
});

submissionEventListener.on('submissionStarted', function(params){
  var submissionId = params.submissionId;
  var submissionStartedTimestamp = params.submissionStartedTimestamp;
  console.log("Submission with ID " + submissionId + " has started at " + submissionStartedTimestamp);
});

submissionEventListener.on('submissionComplete', function(params){
  var submissionId = params.submissionId;
  var submissionCompletedTimestamp = params.submissionCompletedTimestamp;
  console.log("Submission with ID " + submissionId + " has completed at " + submissionCompletedTimestamp);
});
