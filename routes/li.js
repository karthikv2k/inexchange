var linkedin_client = 
require('linkedin-js')
(CONFIG.LI_API_KEY,CONFIG.LI_SECRET, 'http://localhost:5000/li_auth');
var url=require('url');
var https=require('../lib/https_client');
var utils=require('../lib/utils');

module.exports = function(app){

  app.get('/li_share',function(req, res){
      var params = req.query;
      params.oauth_token_secret= req.session.token.oauth_token_secret;
      params.oauth_token= req.session.token.oauth_token;
      utils.li_share(params,function(data){
        res.end(data);
        });
      });

  app.get('/li_auth',function(req, res){
      // the first time will redirect to linkedin
      linkedin_client.getAccessToken(req, res, function (error, token) {
        req.session.token = token;
        console.log(token);
        //res.render('nothing.ejs',{module: "li_auth",data:{token: req.session.token}});
        res.redirect('/li_home');
        });
      });

  app.get('/li_post',function(req,res){
      if(req.query.message!=null && req.query.message.length>0){
      console.log('in /li_post');
      console.log(req.session.token);
      linkedin_client.apiCall('POST', '/people/~/shares',
        {
              token: {
                      oauth_token_secret: req.session.token.oauth_token_secret
                            , oauth_token: req.session.token.oauth_token
                                  }
        , share: {
              comment: "Hello world"
           , visibility: {code: 'anyone'}
           }
           }
           , function (error, result) {
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.end(JSON.stringify({error:error,result:result}));
           }
           );
      }
      });

app.get('/li_home',function(req,res){
    console.log('in li_home');
    if(req.session.token==null){
    res.redirect('/');
    }else{
    console.log('making api call');
    linkedin_client.apiCall('GET', '/people/~',
      {token:req.session.token},
      function (error, result) {
      console.log('done api call');
      if(result!=null){
      parsed_result=url.parse(result.siteStandardProfileRequest.url,true);
      mid=parseInt(parsed_result.query.key);
      req.session.li_mid=mid;
      DB.li_update_user(result.firstName,result.lastName,JSON.stringify(req.session.token),mid);
      res.render('nothing.ejs',{module: "li_auth",
        data:{first_name: result.firstName,client_id: CONFIG.SE_CLIENT_ID,redirect_url:"http://localhost:5000/se_auth"}});
      }else{
      res.redirect("/500.html");
      }
      });
    }
});
}
