https=require('http-get');
var querystring = require('querystring');
var http = require('https');
var url_lib=require('url');

exports.get=function(options,callback){
  console.log('requesting: '); 
  console.log(options); 
  https.get(options, function (error, result) {
      if (error) {
      console.error(error);
      callback(null);
      } else {
      callback(result.buffer);
      }   
      });
}

exports.post=function(url,params,callback){
  var post_data = querystring.stringify(params); 

  url = url_lib.parse(url);

  // http.request settings
  var post_options = {
      host: url.hostname,
      path: url.pathname,
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        callback(chunk);
        });
      });
  post_req.write(post_data);
  post_req.end();
}
