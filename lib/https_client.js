https=require('https');
exports.https_get=function(){
  https.get({ host: 'encrypted.google.com', path: '/' }, function (res) {
      res.on('data',function(d){console.log(d.toString())}); });
}
