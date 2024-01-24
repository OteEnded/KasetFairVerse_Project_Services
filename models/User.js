const users = require('../entities/Users');
const BigBangTheory_User_Profiles = require('../entities/BigBangTheory_User_Profiles')
const BigBangTheory_Token_Buffer = require('../entities/BigBangTheory_Token_Buffers')
const {response} = require("express");

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

        console.log("User[requestUserFromBigBangTheory]: Getting user from big bang theory with token -> " + access_token);

        // return await getUsersByUserName()
        const request = require('request');
        const options = {
            'method': 'POST',
            'url': 'https://apisix-gateway-beta.bigbangtheory.work/graphql/portal',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                query: `query {
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
        throw error;
    }
}

async function getDefaultUser(which_type = "tester") {
    if (which_type === "tester") {
        return await users.findOne({
            where: {
                user_id: 1
            }
        });
    }
    // if (which_type === "error") {
    return await users.findOne({
        where: {
            user_id: 2
        }
    });
    // }
}

// Function to get user from big bang theory using access token
async function getUserFromBigBangTheory(access_token) {

    try {

        console.log("User[getUserFromBigBangTheory]: Getting user from big bang theory with token -> " + access_token);

        if (access_token === "1") {
            console.log("User[getUserFromBigBangTheory]: access_token is 1, return tester user");
            return await getDefaultUser("tester");
        }

        if (access_token == null) {
            console.log("User[getUserFromBigBangTheory]: access_token is null, return error user");
            return await getDefaultUser("error");
        }

        const data_from_buffer = await BigBangTheory_Token_Buffer.findOne({
            where: {
                bbt_token: access_token
            }
        });

        let target_user;

        if (data_from_buffer != null) {
            target_user = await users.findOne({
                where: {
                    user_id: data_from_buffer.user_id
                }
            });
            console.log("User[getUserFromBigBangTheory]: found token in buffer, set target_user to ->", target_user);
        }

        const res_from_bbt = await requestUserFromBigBangTheory(access_token);

        if (Object.keys(res_from_bbt).includes("errors") || res_from_bbt.data == null) {
            console.log("User[getUserFromBigBangTheory]: ERROR! Cannot get user from big bang theory with the token");
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

            await BigBangTheory_User_Profiles.create({
                bbt_user_uuid: res_from_bbt.data.user.uuid,
                user_id: target_user.user_id,
                bbt_user_id: res_from_bbt.data.user.id,
                email: res_from_bbt.data.user.email,
                phone_number: res_from_bbt.data.user.phone_number,
                image_profile: res_from_bbt.data.user.profile.image_profile,
                date_of_birth: res_from_bbt.data.user.profile.date_of_birth,
                display_name: res_from_bbt.data.user.profile.display_name,
                gender: res_from_bbt.data.user.profile.gender,
                location_base: res_from_bbt.data.user.profile.location_base,
                caption: res_from_bbt.data.user.profile.caption
            });

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

            await BigBangTheory_User_Profiles.update({
                user_id: target_user.user_id,
                bbt_user_id: res_from_bbt.data.user.id,
                email: res_from_bbt.data.user.email,
                phone_number: res_from_bbt.data.user.phone_number,
                image_profile: res_from_bbt.data.user.profile.image_profile,
                date_of_birth: res_from_bbt.data.user.profile.date_of_birth,
                display_name: res_from_bbt.data.user.profile.display_name,
                gender: res_from_bbt.data.user.profile.gender,
                location_base: res_from_bbt.data.user.profile.location_base,
                caption: res_from_bbt.data.user.profile.caption
            },
            {
                where: {
                    bbt_user_uuid: res_from_bbt.data.user.uuid
                }
            });

        }

        // save token buffer to database
        await saveUserTokenBufferToDatabase(access_token, target_user.user_id);

        return target_user;

    } catch (error) {
        throw error;
    }
}

// Function to save user token buffer to database
async function saveUserTokenBufferToDatabase(access_token, user_id) {
    try {

        let token_buffer = await BigBangTheory_Token_Buffer.findOne({
            where: {
                bbt_token: access_token
            }
        });

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
