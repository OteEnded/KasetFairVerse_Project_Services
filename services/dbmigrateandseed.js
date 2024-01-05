const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

function migrate(is_force = true) {
    connection.sync({ force: is_force }) // Use force: true carefully, it will drop the table if it already exists
        .then(() => {
            console.log('Table created successfully');
        })
        .catch((err) => {
            console.error('Error creating table:', err);
        });
}

function seed() {
    return
    // const User = require('../models/User');
    // const KubKaoKabKang_PlayRecord = require('../models/KubKaoKabKang_PlayRecord');
}

module.exports = {
    migrate,
    seed
};
