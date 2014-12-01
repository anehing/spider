var http = require("http");


// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");

var url = "http://www.lagou.com/gongsi/0-0-0?pn=1";

download(url, function(data) {
  if (data) {
    var $ = cheerio.load(data);
	$(".hc_list > li").each(function(i,e){
		var first_a = $(e).find("a");
		var company = $(first_a).find("h3").text();
		console.log(company+": ["+company+"]("+first_a.attr("href")+")");;
	});
  }
});

