angular.module('nickff')
.factory('Utilities', [
	Utilities
	]);

function Utilities() {


	return {
		doesCordovaExist: doesCordovaExist
	};


	function doesCordovaExist() {
	  return Object.keys(ionic.Platform.device()).length > 0;
	}


}


