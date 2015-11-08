angular.module('nickff')
.factory('Roster', [
	'$http',
	Roster
	]);

function Roster($http) {

	var lineup = [];
	var playerKeys = [];


	return {
		lineup: lineup,
		fetchData: fetchData,
		getRoster: getRoster,
		getNames: getNames

	};

	function getNames() {
		
	}

	function fetchData() {

		var url = 'https://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/roster/?format=json';

		console.log("getRoster url: " + url);
		
		var rosterRequest = {
			method: "GET",
			url: url
		};
		return $http(rosterRequest).then(function(response) {
			console.log("Got roster data");
			console.log(response.data);

		
			var rosterCount = response.data.fantasy_content.team[1].roster[0].players.count;
			
			for (var i=0; i<rosterCount; i++) {
		
				var player = response.data.fantasy_content.team[1].roster[0].players[i].player; 

				lineup.push(player);
				console.log(lineup[i]);

				playerKeys.push(player[0][0].player_key);

				// var player = {
				// 	key: response.data.fantasy_content.team[1].roster[0].players[i].player[0][0].player_key,
				// 	name: response.data.fantasy_content.team[1].roster[0].players[i].player[0][2].name.full
				// };
				// console.log("Player in roster: ");
				// console.log(player);
				// lineup.push(player);
			}
		
		}, defaultErrorCallback);

	}


	function getRoster() {

		if (lineup.length === 0) {
			fetchData().then(function(response) {
				console.log("success callback in getRoster()");
				return lineup;
			}, defaultErrorCallback);
		}

		return lineup;

		// var url = 'https://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/roster/?format=json';

		// console.log("getRoster url: " + url);
		
		// var rosterRequest = {
		// 	method: "GET",
		// 	url: url
		// };
		// $http(rosterRequest).then(function(response) {
		// 	console.log("Got roster data");
		// 	console.log(response.data);

		
		// 	var rosterCount = response.data.fantasy_content.team[1].roster[0].players.count;
			
		// 	for (var i=0; i<rosterCount; i++) {
				
		// 		var player = {
		// 			key: response.data.fantasy_content.team[1].roster[0].players[i].player[0][0].player_key,
		// 			name: response.data.fantasy_content.team[1].roster[0].players[i].player[0][2].name.full
		// 		};
		// 		console.log("Player in roster: ");
		// 		console.log(player);
		// 		lineup.push(player);
		// 	}
		
		// }, defaultErrorCallback);
	}


}