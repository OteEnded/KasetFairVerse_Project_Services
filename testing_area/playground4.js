const users = require('../entities/Users');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
// const user = require('../models/user');

async function fetchUsers() {
    try {
      const userList = await user.getAllUsers();
      console.log("List of users: ", userList[0].dataValues);
      // Process userList as needed
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }
  
fetchUsers();