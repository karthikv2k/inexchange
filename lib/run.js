var argv = require('optimist').argv;

if(argv.file != null){
  require('./config.js');
  require(argv.file);
}
