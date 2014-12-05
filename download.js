/**
 * Created by ane on 12/4/14.
 */

var http = require("http");
var cheerio = require("cheerio");
var fs = require('fs');
var _companies =[];
var download = function (url,file, callback) {
    http.get(url, function (res) {
        var data = "";
        if(file){
            res.setEncoding('binary');
        }
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
var job = function(url,id){
	download(url,false, function (data) {
        if (data) {
			var $ = cheerio.load(data);
			var _job = $(".job_detail");
			if(_job.length!=undefined){
				var _department = _job.find("h1>div").text().trim();
				var _title = $(".job_detail h1").attr("title").trim();
				var _tags = [];
				var _responses = [];
				_job.find(".job_request span").each(function(index){
					_tags.push($(this).text().trim());
				});
				$(".job_bt p").each(function(index){
					_responses.push($(this).text().trim());
				});
				var job = {
					"_department": _department,
					"_title" : _title,
					"_tags" : _tags,
					"_responses" : _responses
				};
				console.log(job);
			}
        }
    });
}
var spider =function (url,i) {
    console.log("==========="+url+"=============");
    download(url,false, function (data) {
        if (data) {
            var $ = cheerio.load(data);
            var _labels = [];
            $("#hasLabels li span").each(function (index) {
                _labels.push($(this).text().trim());
            });
            var _tags = [];
            $(".c_tags").find("td").each(function (index) {
                if (index % 2 == 1) {
                    if (index == 7) {
                        _tags.push($(this).find("a").attr("href"))
                    } else {
                        _tags.push($(this).text().trim());
                    }
                }
            });
            var _stageshow = [];
            $(".stageshow span").each(function (index) {
                _stageshow.push($(this).text().trim());
            });
            var _uri = $(".member_info > .m_portrait img").attr("src");
            var _pic="";
            if (_uri!=undefined){
                _pic = _uri.split("/").pop();
                download(_uri,true,function(data){
                    if(data){
                        fs.writeFile( './logo/'+_pic, data, 'binary', function(err) {
					    if(err){
		                 	console.log("error   : "+  url);
		                 //	throw err;
		                 }
		                 console.log(url);
                        });
                    }
                });
            }
            if(_pic.trim()==""){
               _pic = "leader_default.png";
            }
            var _member_info = {
                "m_pic": _pic,
                "m_name": $(".member_info > .m_name").text().trim(),
                "m_weibo": $(".member_info > .m_name a").attr("href"),
                "m_position": $(".member_info > .m_position").text().trim(),
                "m_intro": $(".member_info > .m_intro").text().trim()
            };
            var _jobs = [];
            $("#jobList li").each(function (index) {
                _jobs.push({
                    "href": $(this).find("a").attr("href"),
                    "title": $(this).find("h3 span").first().text().trim(),
                    "city": $(this).find("h3 span").last().text().trim(),
                    "resp": $(this).find("div").text().trim()
                });
            });
            var _logo_uri = $("#logoShow > img").attr("src");
            var _logo ="";
            if(_logo_uri!=undefined){
                _logo = _logo_uri.split('/').pop();
                download(_logo_uri,true,function(data){
                    if(data){
                        fs.writeFile( './logo/'+_logo, data, 'binary', function(err) {
						    if(err){
	         					console.log(id);
	         					//throw err;
	       					  }
	       					  console.log(_logo);
                        });
                    }
                });
            }
            if(_logo.trim()==""){
               _logo = "logo_default.png";
            }
            var id = ++i;
            var _company = {
                "_logo": _logo,
                "_short": $(".c_box > h2").attr("title"),
                "_long": $(".c_box > h1").attr("title"),
                "_oneword": $(".oneword").text().trim(),
                "_labels": _labels,
                "_intro": $(".c_intro").text().trim(),
                "_tags": _tags,
                "_stageshow": _stageshow,
                "_member_info": _member_info,
                "_jobs": _jobs
            };
            console.log(_company);
            fs.writeFile('./data/'+id+".json",'{ "'+id+'" :' +JSON.stringify(_company)+" }",function(err){
                 if(err){
                 	console.log(id);
                 	throw err;
                 }
           });
        }
    });
}
fs.readFile('url8.txt', function (err, data) {
    if(err){
	 	console.log(id);
	 	throw err;
	 }
    var urls = data.toString().trim().split('\n');
    for(var i=0;i<urls.length;i++){
        //_companies=
        spider(urls[i],i);
        //job(urls[i],i);
    }
});

