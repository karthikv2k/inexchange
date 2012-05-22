
client = require('./mysql').client;

client.query(
      'INSERT INTO ' + USER_TABLE + ' (first_name,last_name,li_access_token '
        + ',li_member_id) VALUES (?,?,?,?) '
      + ' ON DUPLICATE KEY UPDATE first_name= ? ',["a","b","c",12,"arthik23"]);
