angular.module('nickff')
.controller('RosterCtrl', [
	'$scope',
	'Roster',
	RosterCtrl
	]);


function RosterCtrl($scope, Roster) {


	$scope.getRoster = function() {
		$scope.roster = Roster.getRoster();
		console.log("$scope.roster:");
		console.log($scope.roster);
	};



}










