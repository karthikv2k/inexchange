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
