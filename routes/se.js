var se_client = require('../lib/se_client');
var db = require('../lib/db');
var utils=require('../lib/utils');

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
                var items= timeline.items;
                var curr_time=new Date().getTime();
                for(var i=0;i<items.length;i++){
                  items[i].display_time=utils.timeDifference(curr_time,(items[i].creation_date*1000));
                  items[i].action = ACTIONS[items[i].post_type+","+items[i].timeline_type];
                  items[i].site="Stack Overflow";
                }
                res.render('nothing.ejs',{module: "se_auth",data:{se_auto_share_options:SE_AUTO_SHARE_OPTIONS,timeline:items}});
            });
          }
          else {
          res.redirect('/500.html');
          }
          });
        });
      });
}
