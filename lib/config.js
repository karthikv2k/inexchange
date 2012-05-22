CONFIG = {}

CONFIG.common=function(){
  console.log('loadin common config...');
  USER_TABLE='ie_users';
}

CONFIG.development=function(){
  console.log('loadin development config...');
}

CONFIG.common();

eval('CONFIG.'+process.env.NODE_ENV+'();');
