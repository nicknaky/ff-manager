angular.module('nickff')
.factory('Players', [
	'$window',
	'$http',
	Players
	]);

function Players($window, $http) {

	var player = {

	};

	var players = [];


	return {
		lookup: lookup,
		fetchProjections: fetchProjections,
		checkUpdate: checkUpdate
	};


	function checkUpdate() {

		var d = new Date();
		var today = d.getDay();

		var lastUpdated = parseInt($window.localStorage['projections_last_updated']);


		console.log("lastUpdated: " + lastUpdated);
		if (today - lastUpdated >= 4) {
			console.log("Looks like it's been awhile since the last projections update. Beginning to fetch new data");
			fetchProjections();	
		} else {
			console.log("Data still relevant, skipping the request to get new data");
		}

	}


	function fetchProjections() {

		console.log("fetching projections from heroku server...");

		var positions = ['qb', 'wr', 'rb', 'te', 'k'];


		for (var position in positions) {

			var url = "https://agile-ridge-4422.herokuapp.com/get/" + position;
			console.log("get url: " + url);

			var getRequest = {
				method: 'GET',
				url: url
			};

			$http(getRequest).then(function(response) {
				console.log("success!");
				console.log(response);
				
				var results = response.data;

				var key = position + '_projections';
				$window.localstorage[key] = JSON.stringify(results);

			}, defaultErrorCallback);	
		}

		var d = new Date();
		var today = d.getDay();
		console.log("day: " + today);
		$window.localstorage['projections_last_updated'] = today.toString(); 
	}


	function lookup(player) {



	}


}