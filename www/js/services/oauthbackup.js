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
	var CLIENT_ID = "dj0yJmk9UlRheHk1U3ZHWHN6JmQ9WVdrOVVqaDVSRE0yTTJNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hYg--";
	var CLIENT_SECRET = "9939a39b914081cf55904fa2c68cec08277e79a7";
	var REDIRECT_URI = "http://www.mushroomrobot.com";
	var RESPONSE_TYPE = "code";
	var OAUTH_URL = BASE_OAUTH + "?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=" + RESPONSE_TYPE;

	var teamName = null;
	var manager = null;

	var roster = [];
	var availablePlayers = [];
	

	var Oauth = {
		login: login,
		getLeagueKey: getLeagueKey,
		leagueKey: function() {
			return leagueKey;
		},
		teamKey: function() {
			return teamKey;
		},
		sendQuery: sendQuery,
		sendAddDrop: sendAddDrop,
		getAvailablePlayers: getAvailablePlayers,
		startChain: startChain,
		clearPlayers: clearPlayers

	};

	var chainCounter = 0;
	function startChain(initialP) {
		console.log("initialP: " + initialP);
		var mustPass = false;
		for (var i=0; i<roster.length; i++) {
			if (roster[i].key === initialP) {
				mustPass = true;
			}
		}

		// if (!mustPass) {
		// 	console.log("Aborting chain since initalP does not match anything in the roster!");
		// 	return;
		// }


		sendAddDrop(availablePlayers[0].key, initialP).then(function(response) {
			sendAddDrop(availablePlayers[1].key, availablePlayers[0].key).then(function(response) {
				sendAddDrop(availablePlayers[2].key, availablePlayers[1].key).then(function(response) {
					sendAddDrop(availablePlayers[3].key, availablePlayers[2].key).then(function(response) {
						sendAddDrop(availablePlayers[4].key, availablePlayers[3].key).then(function(response) {
							sendAddDrop(availablePlayers[5].key, availablePlayers[4].key).then(function(response) {
								sendAddDrop(availablePlayers[6].key, availablePlayers[5].key).then(function(response) {
									sendAddDrop(availablePlayers[7].key, availablePlayers[6].key).then(function(response) {
										sendAddDrop(availablePlayers[8].key, availablePlayers[7].key).then(function(response) {
											sendAddDrop(availablePlayers[9].key, availablePlayers[8].key).then(function(response) {
												sendAddDrop(availablePlayers[10].key, availablePlayers[9].key).then(function(response) {
													sendAddDrop(availablePlayers[11].key, availablePlayers[10].key).then(function(response) {
														sendAddDrop(availablePlayers[12].key, availablePlayers[11].key).then(function(response) {
															sendAddDrop(availablePlayers[13].key, availablePlayers[12].key).then(function(response) {
																sendAddDrop(availablePlayers[14].key, availablePlayers[13].key).then(function(response) {
																	console.log("finished.");	
																	// sendAddDrop(initialP, availablePlayers[14].key).then(function(response) {
																		chainCounter++;
																		getAvailablePlayers(chainCounter);

																		$timeout(function() {
																			console.log("repeating....");
																			if (chainCounter === 30) return;	
																			startChain(availablePlayers[14].key);
																		}, 4000);
																		
																	// })
																	
																})
															})
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})
			})
		});

	}


	return Oauth;


	
	function getRoster() {
		var url = 'https://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/roster/?format=json';

		console.log("getRoster url: " + url);
		
		var rosterRequest = {
			method: "GET",
			url: url
		};
		$http(rosterRequest).then(function(response) {
			console.log("Got roster data");
			rosterResponse = response.data;
			console.log(rosterResponse);

			roster = [];
			var rosterCount = response.data.fantasy_content.team[1].roster[0].players.count;
			
			for (var i=0; i<rosterCount; i++) {
				
				var player = {
					key: response.data.fantasy_content.team[1].roster[0].players[i].player[0][0].player_key,
					name: response.data.fantasy_content.team[1].roster[0].players[i].player[0][2].name.full
				};
				console.log("Player in roster: ");
				console.log(player);
				roster.push(player);
			}
		
		}, errorCallback);
	}

	function clearPlayers() {
		availablePlayers = [];

	}


	
	function getAvailablePlayers(page) {
// response.data.fantasy_content.league[1].players
// max count = 25; start increments at 25.
		var start = page * 25;
		if (typeof page === 'undefined') {
			start = 0;
		}
		var url = "https://fantasysports.yahooapis.com/fantasy/v2/league/" + leagueKey + "/players;status=FA;count=25;start=" + start + "?format=json";

		var playerRequest = {
			method: "GET",
			url: url,
		};
		$http(playerRequest).then(function(response) {
			var results = response.data;
			console.log("getAvailablePlayers() Success!");
			console.log(response);

			availablePlayers = [];

			for (var i=0; i<25; i++) {

				var player = {
					key:  response.data.fantasy_content.league[1].players[i].player[0][0].player_key,
					name: response.data.fantasy_content.league[1].players[i].player[0][2].name.full
				};
				console.log("Adding player: ");
				console.log(player);
				availablePlayers.push(player);
			}


		}, errorCallback);

	}


	function sendAddDrop(addP, dropP) {
		console.log("addP: " + addP + "    dropP: " + dropP);
		var url = 'https://fantasysports.yahooapis.com/fantasy/v2/league/' + leagueKey + '/transactions';

		var addDropBody = "<fantasy_content> <transaction> <type>add/drop</type> <players> <player> <player_key>" + addP + "</player_key> <transaction_data> <type>add</type> <destination_team_key>" + teamKey + "</destination_team_key> </transaction_data> </player> <player> <player_key>" + dropP + "</player_key> <transaction_data> <type>drop</type> <source_team_key>" + teamKey + "</source_team_key> </transaction_data> </player> </players> </transaction> </fantasy_content>";
		
		var addDropRequest = {
			method: "POST",
			url: url,
			// transformRequest: transformRequestAsFormPost,
			headers: {
				'Authorization': $http.defaults.headers.common.Authorization,
				'Content-Type': 'application/xml'
			},
			data: addDropBody
		};

		// return $http(addDropRequest);
		return $http(addDropRequest).then(function(response) {
			console.log("Success!");
			results = response;
			console.log(results);


		}, errorCallback);

	}



	

	function sendQuery(query) {

		var url = 'https://fantasysports.yahooapis.com/fantasy/v2/' + query;

		console.log("url: " + url);
		// var url = 'http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/teams;team_keys=' + teamKey + '/roster?format=json';
		var rosterRequest = {
			method: "GET",
			url: url
		};
		$http(rosterRequest).then(function(response) {
			console.log("Success!");
			results = response;
			console.log(results);
		}, errorCallback);


	}

	function login() {
		console.log("Logging in from OauthService");

		var options = 'location=no,hardwareback=no,zoom=no,toolbar=no,';
		var target = '_blank';


		if (Utilities.doesCordovaExist()) {


		} 

		else {


		}


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
					'redirect_uri': 'http://www.mushroomrobot.com',
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

					getLeagueKey();

				}, errorCallback);
			}

		});
	}

// fantasy football 2015 game key/id : 348
	function getLeagueKey() {

		if(token === null) {
			login();
			return;
		}

		console.log("getting league data");
		console.log($http.defaults.headers.common.Authorization);
		var leagueRequest = {
			method: 'GET',
			url: 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=348/leagues?format=json'
		};
		$http(leagueRequest).then(function(response) {
			leagueKey = response.data.fantasy_content.users[0].user[1].games[0].game[1].leagues[0].league[0].league_key;
			console.log("Fetching leagueKey success! " + leagueKey);
			console.log(response.data);
			getTeamKey();
		}, errorCallback);
	}

	
	
	function getTeamKey() {

		var teamRequest = {
			method: "GET",
			url: 'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=348/teams?format=json'
		};
		$http(teamRequest).then(function(response) {
			teamKey = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][0].team_key;
			teamName = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][2].name;
			manager = response.data.fantasy_content.users[0].user[1].games[0].game[1].teams[0].team[0][14].managers[0].manager.nickname;
			console.log("Fetching teamKey success! " );
			console.log(response);
			console.log("teamKey: " + teamKey);
			console.log(teamName);
			console.log(manager);
			// getRoster();

		}, errorCallback);

	}

	




	function errorCallback(e) {
		console.log(e);
	}


	function init(token) {

		accessToken = token;
		var authorizationHeader = 'Bearer ' + accessToken;
		
		$rootScope.$broadcast('tokenReady');

	}
	
}







