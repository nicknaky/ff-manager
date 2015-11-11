angular.module('nickff')
.controller('HomeCtrl', [
	'$rootScope',
	'$scope',
	'OauthService',
	'$timeout',
	'$location',
	'$http',
	HomeCtrl
	]);


function HomeCtrl($rootScope, $scope, OauthService, $timeout, $location, $http) {



	$scope.input = {
		field1: 'users;use_login=1/games;game_keys=348/leagues?format=json',
		field2: 'users;use_login=1/games;game_keys=348/teams?format=json',
		field3: '',
		add: '348.p.4269',
		drop: '348.p.9527',
		startChain: '348.p.',
		getAnything: '',
		postAnything: ''
	};


	$scope.getMe = function() {


		var url = "https://agile-ridge-4422.herokuapp.com/get/" + $scope.input.getAnything;

		console.log("get url: " + url);

		var getRequest = {
			method: 'GET',
			url: url
		};

		$http(getRequest).then(function(response) {
			console.log("success!");
			console.log(response);
		}, defaultErrorCallback);

	};

	$scope.postMe = function() {
		var postRequest = {
			method: 'POST',
			url: "https://agile-ridge-4422.herokuapp.com/scrape",
			// confirm: 'confirm'
		};

		$http(postRequest).then(function(response) {
			console.log("success");
			console.log(response);
		}, defaultErrorCallback);
	};


	$scope.startChain = function() {

		OauthService.startChain($scope.input.startChain);
	};

	$scope.go = function() {
		console.log("commencing operation test the waters!");
		// OauthService.testTheWaters();
	};


	$scope.submit = function(inputValue, fieldNum) {

		console.log("Submitting from field number " + fieldNum);
		console.log("Entered in: " + inputValue);
		OauthService.sendQuery(inputValue);
	};

	$scope.submitAddDrop = function() {
		OauthService.sendAddDrop($scope.input.add, $scope.input.drop);
	};

	$scope.clearAddDrop = function() {
		$scope.input.add = '348.p.';
		$scope.input.drop = '348.p.';
	};


	$scope.clearPlayers = function() {
		OauthService.clearPlayers();
	};


	$scope.pasteLeagueKey = function(fieldNum) {

		switch(fieldNum) {

			case 1:
				$scope.input.field1 += leagueKey;
				break;
			
			case 2:
				$scope.input.field2 += leagueKey;
				break;

			case 3:
				$scope.input.field3 += leagueKey;
				break;

			default:
				break;
		}

	};

	$scope.getAvailablePlayers = function() {
		console.log("clicked getAvailablePlayers!");
		OauthService.getAvailablePlayers(0);

	};

	$scope.pasteJSON = function(fieldNum) {
		$scope.input["field" + fieldNum] += "?format=json";
	};

	$scope.pasteTeamKey = function(fieldNum) {

		$scope.input["field" + fieldNum] += teamKey;
	};


	$scope.pasteUseLogin = function(fieldNum) {

		$scope.input["field" + fieldNum] += "use_login=1";
	};

	$scope.clear = function(fieldNum) {
		console.log("fieldNum: " + fieldNum);

		$scope.input["field" + fieldNum] = '';	
	};


	$scope.login = function() {

		console.log("clicked login");

		OauthService.getLeagueKey();

	};

	$scope.players = [1,2,3,4,5];

	$scope.leagueData = "not supposed to show";


	$scope.ready = {
		token: false
	};

	$scope.$on('tokenReady', function() {
		$timeout(function() {
			$scope.ready.token = true;
		}, 0);
		
		console.log("heard tokenReady event!");
	});


	$scope.getLeagueData = function() {

		console.log("clicked getLeagueData");

	};

	$scope.refreshData = function() {

		console.log("clicked refreshData");
		OauthService.getLeagueKey();

	};

	$scope.$watch(
		function(){
	    return $location.search();
	}, function(value){
	    console.log(document.location);

	    var searchParam = window.location.search;
	    var code = searchParam.split('code=')[1];
	    console.log("code: " + code);

	    if(code !== undefined) {
	    	OauthService.login(code);
	    }

	});


}










