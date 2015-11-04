angular.module('nickff')
.controller('RootCtrl', [
	'$scope',
	'$state',
	RootCtrl
	]);


function RootCtrl($scope, $state) {


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










