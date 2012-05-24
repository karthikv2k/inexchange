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
CONFIG.SE_SECRET=process.env.SE_SECRET 
CONFIG.SE_API_KEY=process.env.SE_API_KEY

CONFIG.common=function(){
  console.log('loadin common config...');
  USER_TABLE='ie_users';
  SE_AUTO_SHARE_OPTIONS=[
    {default_option:"off",name:"Accepted an answer",id:1}
   ,{default_option:"on",name:"Posted an answer",id:2}
   ,{default_option:"on",name:"Asked a question",id:3}
   ,{default_option:"on",name:"Earned a badge",id:4}
   ,{default_option:"on",name:"Posted a comment",id:5}
   ,{default_option:"off",name:"Reviewed a suggested edit",id:6}
   ,{default_option:"off",name:"Edited a post",id:7}
   ,{default_option:"off",name:"Suggested an edit",id:8}
  ]
}

CONFIG.development=function(){
  console.log('loadin development config...');
}

CONFIG.common();

eval('CONFIG.'+CONFIG.NODE_ENV+'();');
