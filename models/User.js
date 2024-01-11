const users = require('../entities/Users');
const {response} = require("express");

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

// Function to get users by bigbang_uuid
async function getUsersByBigBangUUID(bigbang_uuid) {
    try {
        const all_users = await users.findOne({
            where: {
                bigbang_uuid: bigbang_uuid
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

// Function to request user from big bang theory using access token
async function requestUserFromBigBangTheory(access_token) {
    try {

        // return await getUsersByUserName()

        const request = require('request');
        const options = {
            'method': 'POST',
            'url': 'https://apisix-gateway-beta.bigbangtheory.work/graphql/portal',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + access_token
            },
            body: JSON.stringify({
                query: `query {
                      user {
                        id
                        uuid
                        username
                      }
                    }`,
                variables: {}
            })
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const responseData = JSON.parse(response.body);
                        resolve(responseData);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }
    catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Function to get user from big bang theory using access token
async function getUserFromBigBangTheory(access_token) {
    try {

        return await users.findOne({
            where: {
                user_id: 1
            }
        });

        // const res = await requestUserFromBigBangTheory(access_token);
        // if (res.data == null) {
        //     return null;
        // }
        // let user_in_db = await users.findOne({
        //     where: {
        //         bigbang_uuid: res.data.user.uuid
        //     }
        // });
        // if (user_in_db == null) {
        //     return  await users.create({
        //         user_name: res.data.user.username,
        //         bigbang_uuid: res.data.user.uuid
        //     });
        // }
        //
        // // check if username have changed
        // let saved_username = await users.findOne({
        //     where: {
        //         bigbang_uuid: res.data.user.uuid
        //     }
        // });
        //
        // // update username if changed
        // if (saved_username.user_name !== res.data.user.username){
        //     return await users.update({
        //         user_name: res.data.user.username
        //     }, {
        //         where: {
        //             bigbang_uuid: res.data.user.uuid
        //         }
        //     });
        // }
        //
        // return await users.findOne({
        //     where: {
        //         bigbang_uuid: res.data.user.uuid
        //     }
        // });

    }
    catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Exporting functions
module.exports = {
    getAllUsers,
    getUser,
    getUsersByUserName,
    getUsersByBigBangUUID,
    createUser,
    updateUser,
    deleteUser,
    getUserFromBigBangTheory
};
