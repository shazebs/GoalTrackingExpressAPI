const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'goalstracking',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if (error)
    {
        throw error;
    }
    else
    {
        console.log(`MySql connection to "goalstracking" database successful!`); 
    }
})

module.exports = connection; 