//GLOBALS
token = null;
leagueKey = null;
teamKey = null;
BASE_URL = "https://fantasysports.yahooapis.com/fantasy/v2/";


function defaultErrorCallback(e) {
    console.log(e);
}


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

    console.log("teamKey: " + teamKey);
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  .state('iframe-login', {
    url: '/iframe-login',
    templateUrl: 'templates/iframe.login.html',
    controller: 'HomeCtrl'
  })

  .state('roster', {
    url: '/',
    templateUrl: 'templates/roster.html',
    controller: 'RosterCtrl'
  })
  .state('transactions', {
    url: '/',
    templateUrl: 'templates/transactions.html',
    controller: 'TransactionsCtrl'
  })

  ;

  
  $urlRouterProvider.otherwise('/');

});
