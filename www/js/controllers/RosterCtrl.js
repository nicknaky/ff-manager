angular.module('nickff')
.controller('RosterCtrl', [
	'$scope',
	'Roster',
	RosterCtrl
	]);


function RosterCtrl($scope, Roster) {

	// $scope.roster = {};

	$scope.getRoster = function() {
		// $scope.roster.lineup = Roster.getRoster();
		Roster.getRoster().then(function(response) {
			console.log("response in ctrl");
			$scope.roster = response;
			console.log($scope.roster);
		}, defaultErrorCallback);
	};



}










