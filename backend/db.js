const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',    
  user: 'root',
  password: 'Jenilove@22',
  database: 'Employees',  
});

module.exports = pool.promise();
