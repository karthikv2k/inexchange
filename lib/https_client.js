https=require('http-get');
exports.get=function(options,callback){
  https.get(options, function (error, result) {
      if (error) {
      console.error(error);
      } else {
      callback(result.buffer);
      }   
      });
}
