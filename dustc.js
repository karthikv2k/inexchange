var fs = require('fs')
   ,dust=require('dustjs-linkedin');
var input_path = 'views/dusts';
var output_path = 'public/javascripts/dusts';
files=fs.readdirSync(input_path);
var data="",module="";
for(var i=0;i<files.length;i++){
  module=files[i].split('.')[0];
  console.log("Compiling "+files[i]+" to " + module+".js");
  data=dust.compile(fs.readFileSync(input_path+"/"+files[i], 'utf8'),module);
  fs.writeFile(output_path+"/"+module+".js",data);
}

