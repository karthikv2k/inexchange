CONFIG = {}

//loading env variables
CONFIG.DB_HOST=process.env.DB_HOST 
CONFIG.DB_USER=process.env.DB_USER 
CONFIG.DB_PASSWORD=process.env.DB_PASSWORD 
CONFIG.DB_PORT=process.env.DB_PORT 
CONFIG.DB_DATABASE=process.env.DB_DATABASE 
CONFIG.NODE_ENV=process.env.NODE_ENV 
CONFIG.LI_API_KEY=process.env.LI_API_KEY 
CONFIG.LI_SECRET=process.env.LI_SECRET 
CONFIG.SE_CLIENT_ID=process.env.SE_CLIENT_ID 
CONFIG.SE_API_KEY=process.env.SE_API_KEY

CONFIG.common=function(){
  console.log('loadin common config...');
  USER_TABLE='ie_users';
}

CONFIG.development=function(){
  console.log('loadin development config...');
}

CONFIG.common();

eval('CONFIG.'+CONFIG.NODE_ENV+'();');
