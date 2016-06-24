angular.module('nickff')
.controller('RootCtrl', [
	'$scope',
	'$state',
	'OauthService',
	RootCtrl
	]);


function RootCtrl($scope, $state, OauthService) {

	$scope.login = function() {
		OauthService.login();
	};

	$scope.refreshData = function() {
		OauthService.login();
	};

	$scope.selectOption = function(optionName) {
		console.log("Selected option: " + optionName);
		switch(optionName) {

			case 'home':
				$state.go('home');
				break;

			case 'roster':
				$state.go('roster');
				break;

			case 'transactions':
				$state.go('transactions');
				break;

			case 'settings':
				break;

			case 'automation':
				break;


			default:
				break;
		}

		toggleSideMenu();



	}


}










