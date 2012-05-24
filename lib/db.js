client = require('./mysql').client;

exports.li_update_user=function(first_name,last_name,token,mid){
  console.log('inserting',JSON.stringify([first_name,last_name,token,mid]));
  client.query(
      'INSERT INTO ' + USER_TABLE + ' (first_name,last_name,li_access_token '
        + ',li_member_id) VALUES (?,?,?,?) '
        + 'ON DUPLICATE KEY UPDATE '
        + ' first_name = ? '
        + ' ,last_name = ? '
        + ' ,li_access_token = ? '
        ,[first_name,last_name,token,mid
        ,first_name,last_name,token]);
  console.log('done ');
}

exports.se_update_user=function(mid,access_token,se_account_ids){
  console.log('inserting',JSON.stringify([mid,access_token,se_account_ids]));
  client.query(
      'INSERT INTO ' + USER_TABLE + ' (li_member_id, se_access_token, se_account_ids) '
        + ' VALUES (?,?,?) '
        + 'ON DUPLICATE KEY UPDATE '
        + ' se_access_token = ? '
        + ' ,se_account_ids = ? '
        ,[mid,access_token,se_account_ids,access_token,se_account_ids]);
  console.log('done ');
}

exports.se_get_members=function(cb){
  console.log('se_get_members');
  client.query(
      'SELECT li_member_id FROM ' + USER_TABLE + ' WHERE 1=1',
      function(err,results,fields){
        if (err) {
          throw new err;
        }
        else {
          cb(results);
          console.log('fetched all members');
        }
      });
}

exports.se_get_access_token=function(mid,cb){
  console.log('se_get_access_token ', mid);
  console.log(USER_TABLE);
  client.query(
      'SELECT se_access_token FROM ' + USER_TABLE + ' WHERE li_member_id=?', [mid],
      function(err,results,fields){
        if (err) {
          throw err;
        }
        else {
          cb(results);
          console.log('got stack exchange access tokens');
        }
      });
}

exports.li_get_access_token=function(mid,cb){
  console.log('li_get_access_tokens ', mid);
  client.query(
      'SELECT li_access_token FROM ' + USER_TABLE + ' WHERE li_member_id=?' [mid],
      function(err,results,fields){
        if (err) {
          throw err;
        }
        else {
          cb(results);
          console.log('got linkedin access tokens');
        }
      });
}
