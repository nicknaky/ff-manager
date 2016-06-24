angular.module('nickff')
.factory('Transactions', [
	'$http',
	Transactions
	]);

function Transactions($http) {

	var transactions = [];

	return {
		all: transactions,
		getTransactions: getTransactions
	};

	function fetchData() {

		var url = BASE_URL + "league/348.l.615723/transactions?format=json";
		
		var transactionsRequest = {
			method: "GET",
			url: url
		};

		return $http(transactionsRequest).then(function(response) {
			console.log("Got transactions data");
			console.log(response.data);

			// Seems like the earliest ~15 don't player data so we won't loop all the way
			var transactionsCount = response.data.fantasy_content.league[1].transactions.count;

			for (var i=0; i<transactionsCount-15; i++) {
				var transactionRaw = response.data.fantasy_content.league[1].transactions[i].transaction;

				var transaction = {};
				transaction.id = transactionRaw[0].transaction_id;
				transaction.timestamp = transactionRaw[0].timestamp;
				transaction.type = transactionRaw[0].type;
				transaction.status = transactionRaw[0].status;
				transaction.count = transactionRaw[1].players.count;


				if (transaction.type === "add") {
					transaction.addedPlayer = {
						key: transactionRaw[1].players[0].player[0][0].player_key,
						name: transactionRaw[1].players[0].player[0][2].name.full,
						team: transactionRaw[1].players[0].player[0][3].editorial_team_abbr,
						pos: transactionRaw[1].players[0].player[0][4].display_position,
						user: transactionRaw[1].players[0].player[1].transaction_data[0].destination_team_name
					};
				} 

				else if (transaction.type === "drop") {
					transaction.droppedPlayer = {
						key: transactionRaw[1].players[0].player[0][0].player_key,
						name: transactionRaw[1].players[0].player[0][2].name.full,
						team: transactionRaw[1].players[0].player[0][3].editorial_team_abbr,
						pos: transactionRaw[1].players[0].player[0][4].display_position,
						user: transactionRaw[1].players[0].player[1].transaction_data[0].source_team_name
					};
				}

				else if (transaction.type === "add/drop") {
					transaction.addedPlayer = {
						key: transactionRaw[1].players[0].player[0][0].player_key,
						name: transactionRaw[1].players[0].player[0][2].name.full,
						team: transactionRaw[1].players[0].player[0][3].editorial_team_abbr,
						pos: transactionRaw[1].players[0].player[0][4].display_position,
						user: transactionRaw[1].players[0].player[1].transaction_data[0].destination_team_name
					};
					transaction.droppedPlayer = {
						key: transactionRaw[1].players[1].player[0][0].player_key,
						name: transactionRaw[1].players[1].player[0][2].name.full,
						team: transactionRaw[1].players[1].player[0][3].editorial_team_abbr,
						pos: transactionRaw[1].players[1].player[0][4].display_position,
						user: transactionRaw[1].players[1].player[1].transaction_data[0].source_team_name
					};
				}

				
				
				transactions.push(transaction);

			}


		}, defaultErrorCallback);
	}

	function getTransactions() {
		return fetchData();
	}


}