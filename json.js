var fs	= require('fs');
fs.appendFile("./url.json", '{'+'"公司"'+":"+'"中信网科"'+"}", function (err) {
	if (err) {
	console.log('========error======');
	}
		console.log('The "data to append" was appended to file!');
});
