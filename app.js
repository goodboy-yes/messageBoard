var http = require("http");
var fs = require("fs");
var template = require("art-template");
var url = require("url");
var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

http.createServer(function(req,res){
	var urlParse = url.parse(req.url, true);
	var pathname = urlParse.pathname;

	if(pathname === "/"){
		fs.readFile("./views/index.html",function(err,data){
			if(err){
				res.end("404 Not Found.")
			}
			var htmlStr = template.render(data.toString(),{comments:comments})
			res.end(htmlStr)

		})
	}else if(pathname.indexOf("/public") === 0 ){
		fs.readFile("."+pathname,function(err,data){
			if(err){
				res.end("404 Not Found")

			}
			res.end(data)
		})
	}else if(pathname.indexOf("/post") === 0){
		fs.readFile("./views/post.html",function(err,data){
			if(err){
				res.end("404 Not Found")
			}
			res.end(data)
		})
	}else if(pathname === "/pinglun"){
		var comment = urlParse.query;
		comment.dateTime = new Date();
		comments.unshift(comment);
		res.statusCode = 302;
		res.setHeader("Location","./")
		res.end();

	}else{
		fs.readFile("./views/404.html",function(err,data){
			if(err){
				res.end("404 Not Found")
			}
			res.end(data)
		})
	}
}).listen(3000,function(){
	console.log("just do it!")
})