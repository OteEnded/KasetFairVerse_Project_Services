const users = require('../entities/Users');

// Function to get all users
async function getAllUsers() {
    try {
        const all_users = await users.findAll();
        var user_list = [];
        for (i in all_users) {
            user_list.push(all_users[i].dataValues);
        }
        return user_list;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Function to get users by user_id
async function getUser(user_id) {
    try {
        const user = await users.findOne({
            where: {
                user_id: user_id
            }
        });
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Function to get users by user_name
async function getUsersByUserName(user_name) {
    try {
        const all_users = await users.findOne({
            where: {
                user_name: user_name
            }
        });
        return all_users;
    }
    catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Function to get users by user_email
async function getUsersByUserEmail(user_email) {
    try {
        const all_users = await users.findOne({
            where: {
                user_email: user_email
            }
        });
        return all_users;
    }
    catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

// Function to create a user
async function createUser(req) {
    try {
        const new_user = await users.create(req);
        return new_user;
    } catch (error) {
        throw new Error(`Error adding user: ${error.message}`);
    }
}

// Function to update a user
async function updateUser(req) {
    try {
        const updated_user = await users.update(req, {
            where: {
                user_id: req.user_id
            }
        });
        return updated_user;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

// Function to delete a user
async function deleteUser(user_id) {
    try {
        const deleted_user = await users.destroy({
            where: {
                user_id: user_id
            }
        });
        return deleted_user;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

// Exporting functions
module.exports = {
    getAllUsers,
    getUser,
    getUsersByUserName,
    getUsersByUserEmail,
    createUser,
    updateUser,
    deleteUser
};
