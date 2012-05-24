var se_client = require('../lib/se_client');
var db = require('../lib/db');

module.exports = function(app){

  app.get('/se_auth',function(req, res){
      var code=req.query.code;
      se_client.get_access_token(code,"http://localhost:5000/se_auth",function(access_token){
        req.session.se_access_token=access_token;
        console.log(access_token);
        se_client.get_id(access_token,function(data){
          if(data!=null){
          var id = data['Stack Overflow']; 
          req.session.se_ids=data;
          db.se_update_user(req.session.li_mid,access_token,JSON.stringify(data));
          se_client.get_timeline(id,access_token,function(timeline){
                res.render('nothing.ejs',{module: "se_auth",data:{se_auto_share_options:SE_AUTO_SHARE_OPTIONS,timeline:timeline.items}});
            });
          }
          else {
          res.redirect('/500.html');
          }
          });
        });
      });
}
