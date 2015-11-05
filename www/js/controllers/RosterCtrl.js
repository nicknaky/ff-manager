angular.module('nickff')
.controller('RosterCtrl', [
	'$scope',
	'Roster',
	RosterCtrl
	]);


function RosterCtrl($scope, Roster) {


	$scope.getRoster = function() {
		Roster.fetchData();
	};

}










