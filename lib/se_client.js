var https = require('./https_client');
var se_url = "https://api.stackexchange.com/2.0";

exports.get_access_token=function(code,redirect_url,callback){
  params ={
        client_id:CONFIG.SE_CLIENT_ID
        ,client_secret:CONFIG.SE_SECRET
        ,code:code
        ,redirect_uri:redirect_url
  }
  https.post("https://stackexchange.com/oauth/access_token",params,function(data){
      console.log(data);
      var access_token=data.split("=")[1];
      callback(access_token);
      });
}


exports.get_id=function(access_token,callback){
  get("/me/associated?",access_token,function(data){
      if(data==null){
      callback(null);
      }else{
      var items=data.items;
      var ids={};
      for(var i=0;i<items.length;i++){
        ids[items[i].site_name]=items[i].user_id;
      }
      callback(ids)}
      }
      );
}

exports.get_questions=function(id,access_token,callback){
  get("/users/"+id+"/questions?site=stackoverflow&",access_token,callback);
}

exports.get_timeline=function(id,access_token,callback){
  get("/users/"+id+"/timeline?site=stackoverflow&filter=!DSJBr&",access_token,callback);
}

function get(path,access_token,callback){
  https.get({url:se_url+path+"access_token="+access_token+"&key="+CONFIG.SE_API_KEY},
      function(data){ 
      if(data==null){
      callback(null);
      }else{
      callback(JSON.parse(data));
      }});
}

