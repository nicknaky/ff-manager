angular.module('nickff')
.factory('OauthService', [
	'$rootScope',
	'Restangular',
	'$http',
	OauthService
	]);

function OauthService($rootScope, Restangular, $http) {





	var BASE_OAUTH = "https://api.login.yahoo.com/oauth2/request_auth";

	var CLIENT_ID = "dj0yJmk9ZkhnYUM1ZkR4T3MxJmQ9WVdrOU1qa3hWREEyTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01ZA--";
	var CLIENT_SECRET = "8e796b50b5d25a1999e0ae1ad6ac7d1510257287";
	var REDIRECT_URI = "http://www.mushroomrobot.com";

	var OAUTH_URL = BASE_OAUTH + "?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code";
	console.log("OAUTH_URL: " + OAUTH_URL);



	//  var baseAccounts = Restangular.one('league');

	// baseAccounts.getList().then(function(accounts) {
	// 	$scope.allAccounts = accounts;
	// });


	var accessToken = null;

	var Oauth = {
		login: login,
	}

	return Oauth;


	function login() {
		console.log("trying to login from oauthservice");

		var options = 'location=no,hardwareback=no,zoom=no,toolbar=no,'
		var target = '_blank';

		var ref = cordova.InAppBrowser.open(OAUTH_URL, target, options);

		ref.addEventListener('loadstart', function(e) {

			var url = e.url;
			console.log("url: " + url);

			var token = url.split('access_token=')[1];
			console.log("access_token: " + token);

			var code = url.split('code=')[1];
			console.log("code: " + code);

			if(token !== undefined) {
				console.log("got token?: " + token);
				init(token);
				ref.close();
			}
			if(code !== undefined) {
				ref.close();
				console.log("url: " + url);
				console.log("code passed: " + code);

				var authorizationHeader = {
					'Authorization': 'Basic ZGoweUptazlaa2huWVVNMVprUjRUM014Sm1ROVdWZHJPVTFxYTNoV1JFRXlUVEpWYldOSGJ6bE5RUzB0Sm5NOVkyOXVjM1Z0WlhKelpXTnlaWFFtZUQwMVpBLS06OGU3OTZiNTBiNWQyNWExOTk5ZTBhZTFhZDZhYzdkMTUxMDI1NzI4Nw==',
					'Content-Type': 'application/x-www-form-urlencoded'
				};

				var authorizationBody = {
					'grant_type': 'authorization_code',
					'redirect_uri': 'http://www.mushroomrobot.com',
					'code': code
				};

				var authorizationRequest = {
					method: 'POST',
					url: 'https://api.login.yahoo.com/oauth2/get_token',
					//headers: authorizationHeader,
					data: authorizationBody
				};

				$http.defaults.headers.common.Authorization = 'Basic ZGoweUptazlaa2huWVVNMVprUjRUM014Sm1ROVdWZHJPVTFxYTNoV1JFRXlUVEpWYldOSGJ6bE5RUzB0Sm5NOVkyOXVjM1Z0WlhKelpXTnlaWFFtZUQwMVpBLS06OGU3OTZiNTBiNWQyNWExOTk5ZTBhZTFhZDZhYzdkMTUxMDI1NzI4Nw=='
				console.log(authorizationRequest);


				$http(authorizationRequest).then(function(response) {
					console.log("success!");
					console.log(response);
				}, function(error) {
					console.log("error!");
					console.log(error);
				})

				//Restangular.setBaseUrl('https://api.login.yahoo.com/oauth2/get_token');

				

				//var getToken = Restangular.post(access);

			}

		});
	}

	function init(token) {

		accessToken = token;
		var authorizationHeader = 'Bearer ' + accessToken;
		//var baseURL = 'http://fantasysports.yahooapis.com/fantasy/v2/league';
		//Restangular.setBaseUrl('http://fantasysports.yahooapis.com/fantasy/v2');
		Restangular.setDefaultHeaders({Authorization: authorizationHeader});
		
		$rootScope.$broadcast('tokenReady');

		var base = Restangular.one('league');
		
		base.getList().then(function(response) {
			
			console.log("response: " + response);
		}, function(err) {
			console.log("error code: " + err.status);
		});
		//Restangular.setBaseUrl('http://fantasysports.yahooapis.com/fantasy/v2/league');
		
		// var baseURL = 'http://fantasysports.yahooapis.com/fantasy/v2/league';
		// var base = Restangular.allUrl('league', baseURL);

		// base.getList().then(function(response) {
		// 	console.log("results: " + response);
		// }, function(err) {
		// 	console.log("error: " + err.status);
		// });


		// console.log("calling restLeague");
		// var restLeague = Restangular.all('league');
		// restLeague.getList().then(function(league) {
		// 	console.log("league GET returned OMFG!");
		// }, function(err) {
		// 	console.log("error calling restLeague: " + err.status);
		// });


	}
	
}













