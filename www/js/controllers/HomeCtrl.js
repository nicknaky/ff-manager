angular.module('nickff')
.controller('HomeCtrl', [
	'$rootScope',
	'$scope',
	'OauthService',
	'Restangular',
	'$timeout',
	HomeCtrl
	]);


function HomeCtrl($rootScope, $scope, OauthService, Restangular, $timeout) {


	$scope.test = "HomeCtrl works!";

	console.log("hello from home controller");

	$scope.login = function() {


		console.log("clicked login");

		OauthService.login();

	}

	

	$scope.leagueData = "not supposed to show";


	$scope.ready = {
		token: false
	}

	$scope.$on('tokenReady', function() {
		$timeout(function() {
			$scope.ready.token = true;
		}, 0);
		
		console.log("heard tokenReady event!");
	});


	$scope.getLeagueData = function() {

		console.log("clicked getLeagueData");

		var restLeague = Restangular.all('league');
		restLeague.getList().then(function(league) {
			console.log("league GET returned OMFG!");
			$scope.leagueData = league;
			$scope.hasLeagueData = true;

		}, function(err) {
			console.log("error in restLeague: " + err.status);
		});

	}



}










