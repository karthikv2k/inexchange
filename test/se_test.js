var se_client= require('../lib/se_client.js');
var access_token="ly9MHwZiOrjafovIzNB79Q))";
var id=1006004;

console.log('testing get_id');
se_client.get_id(access_token,console.log);
se_client.get_questions(id,access_token,console.log);

