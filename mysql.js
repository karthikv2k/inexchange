var mysql = require('mysql');
var TEST_DATABASE = 'nodejs_mysql_test';
var TEST_TABLE = 'test';
var client = mysql.createClient({
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
database: process.env.DB_DATABASE
});


client.query(
    'SELECT * FROM '+TEST_TABLE,
    function selectCb(err, results, fields) {
    if (err) {
    throw err;
    }

    console.log(results);
    console.log(fields);
    client.end();
    }
    );
