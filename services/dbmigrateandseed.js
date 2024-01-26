const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

async function migrate(is_force = true) {
    connection.sync({ force: is_force }) // Use force: true carefully, it will drop the table if it already exists
        .then(() => {
            console.log('Table created successfully');
        })
        .catch((err) => {
            console.error('Error creating table:', err);
        });
}

async function seed() {
    const User = require('../models/User');
    const user_in_db = await User.getAllUsers();
    if (user_in_db.length > 0) {
        console.log("User table is not empty, skipping seed...");
        return;
    }
    let username_list = ["Tester", "Error cannot load user info", "Guest"];
    let user_id = 1;
    for (let i in username_list) {
        console.log(username_list[i]);
        await User.createUser({
            user_id: user_id,
            username: username_list[i]
        });
        user_id++;
    }
}

module.exports = {
    migrate,
    seed
};
