var linkedin_client = 
require('linkedin-js')
(process.env.LI_API_KEY,process.env.LI_SECRET, 'http://localhost:5000/li_auth');
var url=require('url');

module.exports = function(app){

  app.get('/li_auth',function(req, res){
      // the first time will redirect to linkedin
      linkedin_client.getAccessToken(req, res, function (error, token) {
        req.session.token = token;
        console.log(token);
        //res.render('nothing.ejs',{module: "li_auth",data:{token: req.session.token}});
        res.redirect('/li_home');
        });
      });

  app.get('/li_home',function(req,res){
      if(req.session.token==null){
      res.redirect('/li_auth');
      }else{
      linkedin_client.apiCall('GET', '/people/~',
        {token:req.session.token},
        function (error, result) {
        if(result!=null){
        //console.log('error'+JSON.stringify(error));
        //console.log('result'+JSON.stringify(result));
        parsed_result=url.parse(result.siteStandardProfileRequest.url,true);
        mid=parseInt(parsed_result.query.key);
        DB.li_update_user(result.firstName,result.lastName,JSON.stringify(req.session.token),mid);
        //DB.li_update_user(result.firstName,result.lastName,"a",mid);
        }});
      res.render('nothing.ejs',{module: "li_auth",data:{token: req.session.token}});
      }
      });
}
