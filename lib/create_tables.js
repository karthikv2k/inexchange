client = require('./mysql').client;

client.query(
    'drop table if exists ' + USER_TABLE);

client.query(
    'create table ' + USER_TABLE  + '( ' 
      +'first_name VARCHAR(255)'
      +',last_name VARCHAR(255)'
      +',li_access_token VARCHAR(255)'
      +',se_access_token VARCHAR(255)'
      +',li_member_id INT'
      +',se_account_ids VARCHAR(255)'
      +',created_date TIMESTAMP DEFAULT 0' 
      +',updated_date TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      +',last_post_date TIMESTAMP DEFAULT 0'
      +',auto_share TINYINT DEFAULT 0'
      +',auto_share_settings INT DEFAULT 0'
      +',PRIMARY KEY (li_member_id))');

console.log('done.');
