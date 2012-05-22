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

exports.li_update_user1=function(first_name,last_name,token,mid){
  console.log('inserting',JSON.stringify([first_name,last_name,token,mid]));
  client.query(
      'INSERT INTO ' + USER_TABLE + ' (first_name,last_name,li_access_token '
        + ',li_member_id) VALUES (?,?,?,?) '
        ,[first_name,last_name,token,mid]);
  console.log('done ');
}
