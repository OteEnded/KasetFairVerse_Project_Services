const users = require('../entities/Users');
const BigBangTheory_User_Profiles = require('../entities/BigBangTheory_User_Profiles')
const BigBangTheory_Token_Buffer = require('../entities/BigBangTheory_Token_Buffers')
const dbmigrateandseed = require('../services/dbmigrateandseed');
const apirequester = require('../services/apirequester');

const putil = require('../utilities/projectutility')

// Function to get all users
async function getAllUsers() {
    try {
        const all_users = await users.findAll();
        const user_list = [];
        for (let i in all_users) {
            user_list.push(all_users[i].dataValues);
        }
        return user_list;
    } catch (error) {
        throw error;
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
        throw error;
    }
}

// Function to get users by username
async function getUsersByUserName(username) {
    try {
        const all_users = await users.findOne({
            where: {
                username: username
            }
        });
        return all_users;
    }
    catch (error) {
        throw error;
    }
}

// Function to get users by bbt_user_uuid
async function getUsersByBigBangUUID(bbt_user_uuid) {
    try {
        const all_users = await users.findOne({
            where: {
                bbt_user_uuid: bbt_user_uuid
            }
        });
        return all_users;
    }
    catch (error) {
        throw error;
    }
}

// Function to create a user
async function createUser(req) {
    try {
        const new_user = await users.create(req);
        return new_user;
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
    }
}

// Function to request user from big bang theory using access token
async function requestUserFromBigBangTheory(access_token) {
    try {

        putil.log("User[requestUserFromBigBangTheory]: Getting user from big bang theory with token -> " + access_token);

        let query =
        `query {
            user {
                id
                uuid
                username
                email
                phone_number
                profile{
                    user_id
                    image_profile
                    date_of_birth
                    display_name
                    gender
                    location_base
                    caption
                }
            }
        }`;

        return await apirequester.requestToBBT(access_token, query);
    }
    catch (error) {
        throw error;
    }
}

// Function to request user login from big bang theory to get access token using username and password
async function requestUserLoginFromBigBangTheory(username, password) {
    try {

        putil.log("User[requestUserFromBigBangTheory]: Logging in user from big bang theory with username -> " + username + " and password -> " + password);

        let query =
        `
            mutation {
            login(loginInput:{
                username: "${username}",
                password: "${password}"
            }) {
                access_token
                user{
                    id
                    uuid
                    username
                    email
                    phone_number
                    profile{
                        image_profile
                        user_id
                        date_of_birth
                        display_name
                        gender
                        location_base
                        caption
                    }
                }
            }
            }
        `;

        return await apirequester.requestToBBT("", query);
    }
    catch (error) {
        throw error;
    }
}

async function userLogin(username, password) {
    try {

        putil.log("User[userLogin]: Logging in user with username -> " + username + " and password -> " + password);

        const res_from_bbt = await requestUserLoginFromBigBangTheory(username, password);

        if (Object.keys(res_from_bbt).includes("errors") || res_from_bbt.data == null) {
            putil.log("User[userLogin]: ERROR! Cannot login user from big bang theory with the username and password");
            return null;
        }

        return res_from_bbt.data.login.access_token;


    } catch (error) {
        throw error;
    }
}

// Function to get default user
async function getDefaultUser(which_type = "tester") {

    putil.log("User[getDefaultUser]: Getting default user ->", which_type);

    // check if default user is already in database
    const user_in_db = await users.findAll();
    if (user_in_db.length <= 0) {
        await dbmigrateandseed.seed();
    }

    let user_to_return = null;
    switch (which_type) {
        case "tester":
            user_to_return = await users.findOne({
                where: {
                    user_id: 1
                }
            });
            break;
        case "error":
            user_to_return = await users.findOne({
                where: {
                    user_id: 2
                }
            });
            break;
        case "guest":
            user_to_return = await users.findOne({
                where: {
                    user_id: 3
                }
            });
            break;
        default:
            user_to_return = await users.findOne({
                where: {
                    user_id: 2
                }
            });
            break;
    }
    if (user_to_return != null) return user_to_return;
    else throw new Error("User[getDefaultUser]: cannot get user from database");
}

// Function to get user from big bang theory using access token
async function getUserFromBBTToken(access_token) {

    try {

        putil.log("User[getUserFromBBTToken]: Getting user from big bang theory with token -> " + access_token);

        if (access_token === "1") {
            putil.log("User[getUserFromBBTToken]: access_token is 1, return tester user");
            return await getDefaultUser("tester");
        }


        if (access_token == null) {
            putil.log("User[getUserFromBBTToken]: access_token is null, return error user");
            return await getDefaultUser("error");
        }

        if (access_token === "1") {
            putil.log("User[getUserFromBBTToken]: access_token is 1, return tester user");
            return await getDefaultUser("tester");
        }

        if (access_token.toUpperCase().startsWith("guest".toUpperCase())) {
            putil.log("User[getUserFromBBTToken]: access_token is guest, return guest user");
            return await getDefaultUser("guest");
        }

        const data_from_buffer = await BigBangTheory_Token_Buffer.findOne({
            where: {
                bbt_token: access_token
            }
        });

        let target_user = null;

        if (data_from_buffer != null) {
            target_user = await users.findOne({
                where: {
                    user_id: data_from_buffer.user_id
                }
            });
            putil.log("User[getUserFromBBTToken]: found token in buffer, set target_user to ->", target_user);
        }

        const res_from_bbt = await requestUserFromBigBangTheory(access_token);

        if (Object.keys(res_from_bbt).includes("errors") || res_from_bbt.data == null) {
            putil.log("User[getUserFromBBTToken]: ERROR! Cannot get user from big bang theory with the token");
            return await getDefaultUser("error");
        }

        const bbt_profile_in_db = await BigBangTheory_User_Profiles.findOne({
            where: {
                bbt_user_uuid: res_from_bbt.data.user.uuid
            }
        });

        if (bbt_profile_in_db == null) {

            target_user = await users.create({
                username: res_from_bbt.data.user.username
            });

            await saveBBTUserProfile("create", res_from_bbt, target_user.user_id);

        }
        else {

            target_user = await users.findOne({
                where: {
                    user_id: bbt_profile_in_db.user_id
                }
            });

            // check if username have changed and update username if changed
            if (target_user.username !== res_from_bbt.data.user.username) {
                await users.update({
                    username: res_from_bbt.data.user.username
                },
                {
                    where: {
                        user_id: bbt_profile_in_db.user_id
                    }
                });
                target_user.username = res_from_bbt.data.user.username;
            }

            await saveBBTUserProfile("update", res_from_bbt, target_user.user_id);

        }
        // save token buffer to database
        await saveUserTokenBufferToDatabase(access_token, target_user.user_id);

        return target_user;

    } catch (error) {
        throw error;
    }
}

// Function to save big bang theory user profile to database
async function saveBBTUserProfile(mode = "update", res_from_bbt, user_id){
    putil.log("User[saveBBTUserProfile]: Saving user profile to database");
    let save_data_body = {
        user_id: user_id,
        bbt_user_id: res_from_bbt.data.user.id,
        email: res_from_bbt.data.user.email,
        phone_number: res_from_bbt.data.user.phone_number,
        image_profile: res_from_bbt.data.user.profile.image_profile,
        date_of_birth: res_from_bbt.data.user.profile.date_of_birth,
        display_name: res_from_bbt.data.user.profile.display_name,
        gender: res_from_bbt.data.user.profile.gender,
        location_base: res_from_bbt.data.user.profile.location_base,
        caption: res_from_bbt.data.user.profile.caption
    }
    if (mode === "create") {
        save_data_body.bbt_user_uuid = res_from_bbt.data.user.uuid;
        await BigBangTheory_User_Profiles.create(save_data_body);
        putil.log("User[saveBBTUserProfile]: saved in create mode ->", save_data_body);
    }
    else if (mode === "update") {
        await BigBangTheory_User_Profiles.update(save_data_body, {
            where: {
                bbt_user_uuid: res_from_bbt.data.user.uuid
            }
        });
        putil.log("User[saveBBTUserProfile]: saved in update mode ->", save_data_body, "\nwhere bbt_user_uuid ->", res_from_bbt.data.user.uuid);
    }
    else {
        throw new Error("User[saveBBTUserProfile]: mode is not defined");
    }
}

// Function to save user token buffer to database
async function saveUserTokenBufferToDatabase(access_token, user_id) {
    try {

        let token_buffer = await getUserTokenBufferByBBTToken(access_token);

        if (token_buffer != null) {
            return token_buffer;
        }

        token_buffer = await BigBangTheory_Token_Buffer.create({
            bbt_token: access_token,
            user_id: user_id
        });

        return token_buffer;
    } catch (error) {
        throw error;
    }
}

// Function to get all user token buffer
async function getAllUserTokenBuffer() {
    try {
        const all_token_buffer = await BigBangTheory_Token_Buffer.findAll();
        const token_buffer_list = [];
        for (let i in all_token_buffer) {
            token_buffer_list.push(all_token_buffer[i].dataValues);
        }
        return token_buffer_list;
    } catch (error) {
        throw error;
    }
}

// Function to get user token buffer by bbt_token
async function getUserTokenBufferByBBTToken(bbt_token) {
    try {
        const token_buffer = await BigBangTheory_Token_Buffer.findOne({
            where: {
                bbt_token: bbt_token
            }
        });
        return token_buffer;
    }
    catch (error) {
        throw error;
    }
}

// Function to get user token buffer by user_id
async function getUserTokenBufferByUserId(user_id) {
    try {
        const token_buffer = await BigBangTheory_Token_Buffer.findOne({
            where: {
                user_id: user_id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        putil.log(token_buffer)
        return token_buffer;
    }
    catch (error) {
        throw error;
    }
}

async function getUserAmount() {
    try {
        const user_amount = await users.count();
        return user_amount;
    } catch (error) {
        throw error;
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
    getUserFromBBTToken,
    getAllUserTokenBuffer,
    getUserTokenBufferByBBTToken,
    getUserTokenBufferByUserId,
    requestUserLoginFromBigBangTheory,
    requestUserFromBigBangTheory,
    userLogin,
    getDefaultUser,
    getUserAmount
};
