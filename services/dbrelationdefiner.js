// Entity_Relation.js
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
const RequestLogs = require('../entities/RequestLogs');
const Users = require('../entities/Users');
const BigBangTheory_User_Profiles = require('../entities/BigBangTheory_User_Profiles');
const Point_Sent_Fail_Logs = require('../entities/Point_Sent_Fail_Logs');
const BigBangTheory_Token_Buffers = require('../entities/BigBangTheory_Token_Buffers');
const Point_Sent_Logs = require('../entities/Point_Sent_Logs');
const Star_Buffers = require('../entities/Stars');
const Accessories_ColorMatching_PlayRecords = require('../entities/Accessories_ColorMatching_PlayRecords');
const CoffeeBean_FindMyMeow_PlayRecords = require('../entities/CoffeeBean_FindMyMeow_PlayRecords');
const CornMilk_RaisuwanCrush_PlayRecords = require('../entities/CornMilk_RaisuwanCrush_PlayRecords');
const Cosmetic_HoldYourBasket_PlayLifes = require('../entities/Cosmetic_HoldYourBasket_PlayLifes');
const Cosmetic_HoldYourBasket_PlayRecords = require('../entities/Cosmetic_HoldYourBasket_PlayRecords');
const Hemp_TheDrink_PlayRecords = require('../entities/Hemp_TheDrink_PlayRecords');
const KubKaoKabKang_PasteScrumble_PlayRecords = require('../entities/KubKaoKabGang_PasteScrumble_PlayRecords');
const KubKaoKabKang_CWheat_PlayRecords = require('../entities/KubKaoKabGang_CWheat_PlayRecords');

function defineRelationships() {

    // Define associations between entities
    KubKaoKabKang_PasteScrumble_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(KubKaoKabKang_PasteScrumble_PlayRecords, { foreignKey: 'user_id' });

    KubKaoKabKang_CWheat_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(KubKaoKabKang_CWheat_PlayRecords, { foreignKey: 'user_id' });

    Accessories_ColorMatching_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(Accessories_ColorMatching_PlayRecords, { foreignKey: 'user_id' });

    CornMilk_RaisuwanCrush_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(CornMilk_RaisuwanCrush_PlayRecords, { foreignKey: 'user_id' });

    Cosmetic_HoldYourBasket_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(Cosmetic_HoldYourBasket_PlayRecords, { foreignKey: 'user_id' });

    Hemp_TheDrink_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(Hemp_TheDrink_PlayRecords, { foreignKey: 'user_id' });

    CoffeeBean_FindMyMeow_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(CoffeeBean_FindMyMeow_PlayRecords, { foreignKey: 'user_id' });

    Cosmetic_HoldYourBasket_PlayLifes.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasOne(Cosmetic_HoldYourBasket_PlayLifes, { foreignKey: 'user_id' });

    BigBangTheory_Token_Buffers.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(BigBangTheory_Token_Buffers, { foreignKey: 'user_id' });

    BigBangTheory_User_Profiles.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasOne(BigBangTheory_User_Profiles, { foreignKey: 'user_id' });

    Star_Buffers.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(Star_Buffers, { foreignKey: 'user_id' });

    Star_Buffers.hasOne(Point_Sent_Logs, { foreignKey: 'star_id' });
    Point_Sent_Logs.belongsTo(Star_Buffers, { foreignKey: 'star_id' });

    Star_Buffers.hasMany(Point_Sent_Fail_Logs, { foreignKey: 'star_id' });
    Point_Sent_Fail_Logs.belongsTo(Star_Buffers, { foreignKey: 'star_id' });

}

module.exports.defineRelationships = defineRelationships;
