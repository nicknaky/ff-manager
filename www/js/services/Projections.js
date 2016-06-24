angular.module('nickff')
.factory('Projections', [
	'$http',
	'$window',
	Projections
	]);

function Projections($http, $window) {

	var projections = $window.localStorage['projections'] || [];

	return {
		fetchData: fetchData,
		all: projections
		
	};


	function fetchData() {

		console.log("fetching projections data");

		var url = "https://ff-projections.herokuapp.com/projections";

		var projectionsRequest = {
			method: "GET",
			url: url
		};
		console.log(projectionsRequest);
		$http(projectionsRequest).then(function(response) {
			console.log(response);
			projections = response;
			console.log(projections);
			$window.localstorage['projections'] = projections;
		}, defaultErrorCallback);

	}




}