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

		var url = BASE_URL + "teams;team_keys=348.l.615723.t.6;out=roster/players;players/stats;type=week;week=current?format=json";
		
		var rosterRequest = {
			method: "GET",
			url: url
		};
		return $http(rosterRequest).then(function(response) {
			console.log("Got roster data");
			console.log(response.data);

		
			var rosterCount = response.data.fantasy_content.teams[0].team[1].roster[0].players.count;
			
			for (var i=0; i<rosterCount; i++) {
		
				var playerRaw = response.data.fantasy_content.teams[0].team[1].roster[0].players[i].player;
				
				var player = {};
				player.key = playerRaw[0][0].player_key;
				player.name = playerRaw[0][2].name.full;
				player.status = playerRaw[0][3].status;
				player.team = playerRaw[0][6].editorial_team_abbr || playerRaw[0][7].editorial_team_abbr || playerRaw[0][8].editorial_team_abbr;
				player.position = playerRaw[0][9].display_position || playerRaw[0][10].display_position || playerRaw[0][11].display_position;
				player.selectedPosition = playerRaw[1].selected_position[1].position;

 				// loop through the second array query and join with player key to get points data
				for (var j=0; j<rosterCount; j++) {
					if (player.key === response.data.fantasy_content.teams[0].team[2].players[j].player[0][0].player_key) {
						player.actualPoints = response.data.fantasy_content.teams[0].team[2].players[j].player[1].player_points.total;
						break;
			 		}
				}

				// console.log(player);
				lineup.push(player);

			}


		}, defaultErrorCallback);
	}


	function getRoster() {
		return fetchData();
	}


}