spider(address+page);
var flag =true;
while(flag){
	page++;
	flag= (function(flag){ 
	   return flag;
	})(download(url+page, function(data) {
		if(data){
			var $ = cheerio.load(data);
			if($(".noresult").length==1){
				console.log('空');
				return  false;
			}
			$(".hc_list > li").each(function(i,e){
				var first = $(e).find("a");
				xpath.push(first.attr("href"));
				console.log(xpath);
			});
			 return true;
		}
	}));
}

while(flag){

	flag=(function(flag){return flag;})(download(url,callback))
}


fs.readFile('./url.txt', function (err, data) {
  if (err) throw err;
  console.log(data.toString().split("\n"));
});
var _array=[]
$("#hasLabels li span").each(function(index){
	 _array.push($(this).text());
})
var 
$(".c_tags").find("td:odd").each(function(index){
	console.log( );
})
var _jobs =[];
$("#jobList li").each(function(index){
	_jobs.push({
		"href" : $(this).find("a").attr("href"),
		"title": $(this).find("h3 span").first().text().trim(),
		"city" : $(this).find("h3 span").last().text().trim(),
		"resp" : $(this).find("div").text().trim()
	});
});





var company =function(data,callback){
    console.log(2);
    callback(_companys);
    fs.writeFile( 'companys.json', _companys, function(err) {
        if (err) {
            console.log('company function:' + err.message);
            return null;
        }
    });


}
fs.readFile('url2.txt', function (err, data) {
    console.log(1);
    if (err) {
        console.log("==========error==========");
    }
    company(data,function(_companys){
        console.log(_companys);
        var urls = data.toString().trim().split('\n');
        for(var i=0;i<urls.length;i++){
            spider(urls[i],i);
        }
    });
});

