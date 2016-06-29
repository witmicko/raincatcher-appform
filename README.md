# FeedHenry RainCatcher AppForms

A RainCatcher AppForm module for FeedHenry RainCatcher. This module provides :

- A set of AngularJS directives
- An AngularJS Service to interact with AppForms.
- A backend Service to interact with AppForms

### Client-side usage (via broswerify)

#### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-appform')
...
])
```

#### Integration

##### Angular Services

This module provides a injectable file service : `appformClient`

This client offers these functions :

* `init`
* `list`
* `getForm`
* `getSubmissionLocal`
* `getSubmission`
* `getSubmissions`
* `getFields`
* `createSubmission`
* `submitSubmission`
* `uploadSubmission`
* `composeSubmissionResult`
* `syncStepResult`
* `watchSubmissionModel`

Example of `getForm` usage :

```javascript
resolve: {
    form: function($stateParams, appformClient) {
      return appformClient.getForm($stateParams.formId);
    }
  }
```

For a more complete example around files operations, please check the [demo portal app](https://github.com/feedhenry-raincatcher/raincatcher-demo-portal/blob/master/src/app/appform/appform.js).

##### Directives

| Name | Attributes |
| ---- | ----------- |
| appformSubmission | submissionLocalId, submissionId, submission |
| appform | form, formId |
| appformField | field, model |
| appformFieldLocation | field, model |
| appformFieldPhoto | field, model |
| appformFieldNumber | field, model |
| appformFieldDatetime | field, model |
| appformFieldDate | field, model |
| appformFieldTime | field, model |

## Usage in an express backend

The server-side component of this RainCatcher module exports a function that takes express and mediator instances as parameters, as in:

```javascript
var express = require('express')
  , mbaasApi = require('fh-mbaas-api')
  , app = express()
  , mbaasExpress = mbaasApi.mbaasExpress()
  , mediator = require('fh-wfm-mediator/lib/mediator')
  ;

// configure the express app
...

// setup the wfm user router
require('fh-wfm-appform/lib/server')(mbaasApi);

```

### Forms events

This module will subscribe to the the `submissionEventListener` and react on these events :

- `submissionStarted`
- `submissionComplete`
