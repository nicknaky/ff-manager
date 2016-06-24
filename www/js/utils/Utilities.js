function readDate(milli) {
	var date = new Date(milli);

	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear().toString().substr(2);
	var hour = date.getHours();
	var minutes = date.getMinutes();

}