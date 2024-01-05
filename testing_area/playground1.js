// const mysql = require('mysql2');

// const putil = require('./utilities/projectutility')

// var sql_connection;

// const file_sys = require('fs')

// try {
//     const jsonData = file_sys.readFileSync('config.json', 'utf8');
//     const data = JSON.parse(jsonData);
//     console.log(data.database); // Use the data read from the JSON file
//   } catch (err) {
//     console.error('Error reading file:', err);
//   }

// const putil = require('./utilities/projectutility')
// console.log(putil.getConfig()['database_listing'])

const sqlconnector = require('../services/sqlconnector')

// console.log("test")

sqlconnector.connect()

// const putil = require('../utilities/projectutility')
// configData = putil.getConfig()
// console.log(configData['database_in_use'])

// console.log(putil.listLen(configData['database_in_use']))
// console.log(typeof configData['database_in_use'])

// const sequelizeconnector = require('../services/sequelizeconnector')

// sequelizeconnector.connect()