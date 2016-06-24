angular.module('nickff')
.controller('RosterCtrl', [
	'$scope',
	'Roster',
	'Projections',
	RosterCtrl
	]);


function RosterCtrl($scope, Roster, Projections) {


	$scope.roster = Roster;
	$scope.projections = Projections;
	Projections.fetchData();

	$scope.getRoster = function() {
		Roster.getRoster();
		
	};



}










