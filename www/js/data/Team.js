angular.module('nickff')
.factory('Team', [
	Team
	]);

function Team() {

	var lineup = [];


	return {
		lineup: lineup,
		fetchData: fetchData
	};


	function fetchData() {


		
	}

}