//GLOBALS

var leagueKey = null;
var token = null;





angular.module('nickff', ['ionic', 'base64'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(false);
      StatusBar.styleDefault();
      StatusBar.show();
    }
  });

  document.addEventListener('deviceready', function() {

    console.log("Device is ready from main.js!");
    console.log("window.open works well");

  });

})

.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });

  
  $urlRouterProvider.otherwise('/');

});
