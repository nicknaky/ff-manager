angular.module('nickff')
.factory('OauthService', [
	'$rootScope',
	'$http',
	'$timeout',
	'Utilities',
	'$base64',
	OauthService
	]);

function OauthService($rootScope, $http, $timeout, Utilities, $base64) {

	var BASE_OAUTH = "https://api.login.yahoo.com/oauth2/request_auth";
	var CLIENT_ID = 'dj0yJmk9dUk4RlEwYXBiQm01JmQ9WVdrOVEwSkNZbkpPTkRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1mZg--';
	var CLIENT_SECRET = '81aa463f7576ace27d8612f9dfe423f3057e37e6';
	var REDIRECT_URI = 'http://www.local.mushroomrobot.com';
	
	var RESPONSE_TYPE = "code";
	var OAUTH_URL = BASE_OAUTH + "?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=" + RESPONSE_TYPE;

	return {
		login: login,
		validateLogin: validateLogin
	};


	function validateLogin() {
		
	}

	function login(savedCode) {
		console.log("Logging in from OauthService");

		var options = 'location=no,hardwareback=no,zoom=no,toolbar=no,';
		var target = '_system';

		if (Utilities.doesCordovaExist()) {

			var ref = cordova.InAppBrowser.open(OAUTH_URL, target, options);
			
			ref.addEventListener('loadstart', function(e) {

				var url = e.url;
				console.log("url: " + url);

				var code = url.split('code=')[1];
				console.log("code: " + code);

				if(code !== undefined) {
					console.log("found code");
					ref.close();

					var authorizationBody = {
						'grant_type': 'authorization_code',
						'redirect_uri': REDIRECT_URI,
						'code': code
					};

					var authorizationRequest = {
						method: 'POST',
						url: 'https://api.login.yahoo.com/oauth2/get_token',
						data: authorizationBody
					};

					var encodedAuth = $base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
					$http.defaults.headers.common.Authorization = 'Basic ' + encodedAuth;

					$http(authorizationRequest).then(function(response) {
						
						token = response.data;
						console.log("Fetching access token success! " + token.access_token);

						$http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;

					}, errorCallback);
				}
			});

		} 

		else {
			console.log("cordova not detected");
			
			 if (typeof savedCode === 'undefined') {
			 	document.location = OAUTH_URL;	
			 }
			 
			else if (typeof savedCode !== 'undefined') {
				console.log("found code");

				var authorizationBody = {
					'grant_type': 'authorization_code',
					'redirect_uri': REDIRECT_URI,
					'code': savedCode
				};

				var authorizationRequest = {
					method: 'POST',
					url: 'https://api.login.yahoo.com/oauth2/get_token',
					data: authorizationBody
				};

				var encodedAuth = $base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
				$http.defaults.headers.common.Authorization = 'Basic ' + encodedAuth;

				$http(authorizationRequest).then(function(response) {
					
					token = response.data;
					console.log("Fetching access token success! " + token.access_token);

					$http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;

					if(teamKey === null) {
						getTeamKey();
					}

				}, errorCallback);
			}

		}		
	}


	function getTeamKey() {

		var teamRequest = {
			method: "GET",
			url: 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=348/teams?format=json'
		};
		$http(teamRequest).then(function(response) {
			teamKey = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][0].team_key;
			leagueKey = team.substring(0, team.length-4);
			teamName = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][2].name;
			manager = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][14].managers[0].manager.nickname;
			console.log("Fetching teamKey success! " );
			console.log(response);
			console.log("teamKey: " + teamKey);
			console.log("leageKey: " + leageKey);
			console.log("teamName: " + teamName);
			console.log("manager: " + manager);
			// getRoster();

			getLeagueKey();
		}, errorCallback);

	}


	function errorCallback(e) {
		console.log(e);
	}


}







