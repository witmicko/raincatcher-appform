//Here, we can initialise the wfm.appform module.

//The appform module requires several modules to

'use strict';

/*global angular:true*/

module.exports = 'wfm.appform';

angular.module('wfm.appform', [
  'wfm.core.mediator'
])
  .run(function(mediator, AppformsClientService) {
    AppformsClientService.init();
  });

require('../../dist/index');

//FORM Components
require('./form/formController');
require('./form/formDirective');

//Page Components
require('./page/pageController');
require('./page/pageDirective');

//Section Components
require('./section/sectionController');
require('./section/sectionDirective');

//Field Components
require('./field/fieldController');
require('./field/fieldDirective');

//Number Field Components
require('./fieldNumber/fieldNumberController');
require('./fieldNumber/fieldNumberDirective');

//Text Field Components
require('./fieldText/fieldTextController');
require('./fieldText/fieldTextDirective');

//DateTime Fields
require('./fieldDateTime');

//Location Field
require('./fieldLocation/fieldLocationController');
require('./fieldLocation/fieldLocationDirective');

//Photo Field
require('./fieldPhoto/fieldPhotoController');
require('./fieldPhoto/fieldPhotoDirective');

//Shared Services
require('./shared');
