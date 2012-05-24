require('./config');
var se_client = require('./se_client');
var db = require('./db');
var utils=require('./utils');

var fetch_se_feed = function(results) {
  console.log('fetch_se_feed',JSON.stringify(results));
  if (results.length > 0)
  {
    se_client.get_questions(results[0]['account_id'][0], results[0]['se_access_token'], utils.li_share);
  }
}


var iterate_over_members = function(results) {
  console.log('iterate_over_members',JSON.stringify(results));
  if (results.length > 0)
  {
    db.se_get_access_token(results[0]['li_member_id'], fetch_se_feed);
  }
}
db.se_get_members(iterate_over_members);

