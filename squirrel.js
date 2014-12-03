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
