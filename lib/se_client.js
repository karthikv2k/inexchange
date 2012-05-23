var https = require('./https_client');
var se_url = "https://api.stackexchange.com/2.0";

exports.get_id=function(access_token,callback){
  get("/me/associated?",access_token,callback);
}

exports.get_questions=function(id,access_token,callback){
  get("/users/"+id+"/questions?site=stackoverflow&",access_token,callback);
}

function get(path,access_token,callback){
  https.get({url:se_url+path+"access_token="+access_token+"&key="+CONFIG.SE_API_KEY},
      function(data){ 
      callback(JSON.parse(data));});
}

