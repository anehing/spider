var url = "http://www.lagou.com/upload/logo/1e75cb4a16614a1a814fc5c01c4c19ac.png";
var http = require("http");
var cheerio = require("cheerio");
var fs = require('fs');

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
    http.get(url, function (res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
    }).on("error", function () {
        callback(null);
    });
}
function downimage(url,callback) {
    http.get(url, function (res) {
        var binImage = '';
        res.setEncoding('binary');
        res.on('data', function (chunk) {
            binImage += chunk;
        });
        res.on("end", function () {
            callback(binImage);
        });
    }).on("error", function () {
        callback(null);
    });
}
var prefix = function(){
    fs.appendFile( 'company.json', '{', function(err) {
        if (err) {
            console.log('image writing error:' + err.message);
        }
    });
}
var suffix = function(){
    fs.appendFile( 'company.json', '}', function(err) {
        if (err) {
            console.log('image writing error:' + err.message);
        }
    });
}
var callback=function(){
    fs.appendFile("company.json", JSON.stringify({"d" : "d"}), function (err) {
        if (err) {
            console.log('========error======');
        }
        console.log('The "data to append" was appended to file!');
    });
}
callback;