
var base_request = "https://api.login.yahoo.com/oauth2/request_auth"

var client_id = "dj0yJmk9ZkhnYUM1ZkR4T3MxJmQ9WVdrOU1qa3hWREEyTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01ZA--"
var client_secret = "8e796b50b5d25a1999e0ae1ad6ac7d1510257287"
var redirect_uri = "http://www.mushroomrobot.com"

var request_link = base_request + "?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=token"





angular.module('nickff', ['ionic', 'restangular'])

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

  })

})

.config(function(RestangularProvider, $stateProvider, $urlRouterProvider) {

  console.log("set base in config");
  RestangularProvider.setBaseUrl('https://fantasysports.yahooapis.com/fantasy/v2');

  RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
  });

  
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  
  $urlRouterProvider.otherwise('/');

});
