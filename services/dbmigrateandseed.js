const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
const putil = require('../utilities/projectutility');

async function migrate(is_force = true) {
    connection.sync({ force: is_force }) // Use force: true carefully, it will drop the table if it already exists
        .then(() => {
            putil.log('Table created successfully');
        })
        .catch((err) => {
            console.error('Error creating table:', err);
        });
}

async function seed() {

    putil.log("dbmigrateandseed[seed]: Seeding...")

    putil.log("dbmigrateandseed[seed]: --- Seeding User table ---")

    const User = require('../models/User');
    const user_in_db = await User.getAllUsers();
    if (user_in_db.length > 0) {
        putil.log("User table is not empty, skipping seed...");
        return;
    }
    let username_list = ["Tester", "Error cannot load user info", "Guest"];
    let user_id = 1;
    for (let i in username_list) {
        putil.log(username_list[i]);
        await User.createUser({
            user_id: user_id,
            username: username_list[i]
        });
        user_id++;
    }

    putil.log("dbmigrateandseed[seed]: --- Seeding Star table ---")

    const Star = require('../models/Star');
    const star_in_db = await Star.getAllStars();
    if (star_in_db.length > 0) {
        putil.log("Star table is not empty, skipping seed...");
        return;
    }
    for (let i in Star.getStarSourceList()){
        for (let j = 0; j < putil.getRandomIntInRange(8); j++){
            await Star.createStar({
                user_id: 1,
                source: Star.getStarSourceList()[i]
            });
        }
    }

    const Coupon = require('../models/Coupon');
    await Coupon.createCoupon(
        {
            user_id: 1,
            reward: "Major_ticket_2"
        }
    );

    putil.log("dbmigrateandseed[seed]: --- Seeding Ended ---")
}

module.exports = {
    migrate,
    seed
};
