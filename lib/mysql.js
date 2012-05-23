var mysql = require('mysql');
require('./config');
var client = mysql.createClient({
user: CONFIG.DB_USER,
password: CONFIG.DB_PASSWORD,
host: CONFIG.DB_HOST,
port: CONFIG.DB_PORT,
database: CONFIG.DB_DATABASE
});

exports.client = client;
