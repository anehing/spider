var http = require("http");
var xpath =[],
	path  = [],
	city =[],
	stage = [],
	industry = [];
var cheerio = require("cheerio");
var fs		= require('fs');
 
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

var spider = function(url,j){
	download(url,function(data){
		if(data){
			var $ = cheerio.load(data);
			$(".hc_list > li").each(function(i,e){
				var first = $(e).find("a");
				//xpath.push(first.attr("href"));
				fs.appendFile("./url"+j+".txt", first.attr("href")+'\n', function (err) {
  					if (err) {
						console.log('========error======');
  					}
  						console.log('The "data to append" was appended to file!');
				});
			});
			if($(".noresult").length==0){
				var _array=url.split('=');
				var _page = parseInt(_array[1])+1;
				process.nextTick(function(){spider(_array[0]+"="+_page,j)})
			}
			//console.log(xpath);
		}
	});
}	

var address = "http://www.lagou.com/gongsi";
//获取地址
download(address, function(data) {
  if (data) {
    var $ = cheerio.load(data);
    $("#box_expectCity > dl").each(function(i,e){
    	$(e).find("dd a").each(function(j,f){
    		var str1 = $(f).attr("href").trim().split('/');
    		city.push( str1[str1.length-1].split("-")[0]);
    	});
    })
    $(".hc_tag > dd").find("dl").each(function(i,dl){
		if(i == 0){
			$(dl).find("a").each(function(j,a){
				var str2 = $(a).attr("href").trim().split('/');
				stage.push( str2[str2.length-1].split("-")[1]);
			});
		}else{
			$(dl).find("a").each(function(j,a){
				var str3 = $(a).attr("href").trim().split('/');
				industry.push(str3[str3.length-1].split("-")[2]);
			})
		}
	});
  }
  for(var i=0;i<city.length;i++){
	 for(var j=0;j<stage.length;j++){
		for(var m=0;m<industry.length;m++){
		    var url ="http://www.lagou.com/gongsi/"+city[i]+"-"+stage[j]+"-"+industry[m]+"?pn=1";
			spider(url,j);
		}
	 }
  }
});



