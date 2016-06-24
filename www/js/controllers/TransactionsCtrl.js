angular.module('nickff')
.controller('TransactionsCtrl', [
	'$scope',
	'Transactions',
	TransactionsCtrl
	]);


function TransactionsCtrl($scope, Transactions) {

	console.log("hello from transactionsctrl");
	
	$scope.transactions = Transactions;

	$scope.getTransactions = function() {
		console.log("clicked get transactions button!");
		Transactions.getTransactions();
	};





}






