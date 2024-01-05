const users = require('../entities/Users');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

connection.sync({ force: true }) // Use force: true carefully, it will drop the table if it already exists
.then(() => {
    console.log('Table created successfully');
})
.catch((err) => {
    console.error('Error creating table:', err);
});