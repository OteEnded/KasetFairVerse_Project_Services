// Entity_Relation.js
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
const Users = require('../entities/Users');
const RequestLogs = require('../entities/RequestLogs');
const KubKaoKabKang_PasteScrumble_PlayRecords = require('../entities/KubKaoKabKang_PasteScrumble_PlayRecords');
const KubKaoKabKang_CWheat_PlayRecords = require('../entities/KubKaoKabKang_CWheat_PlayRecords');
const Accessories_ColorMatching_PlayRecords = require('../entities/Accessories_ColorMatching_PlayRecords');
const CornMilk_RaisuwanCrush_PlayRecords = require('../entities/CornMilk_RaisuwanCrush_PlayRecords');
const Cosmetic_HoldYourBasket_PlayRecords = require('../entities/Cosmetic_HoldYourBasket_PlayRecords');
const Hemp_TheDrink_PlayRecords = require('../entities/Hemp_TheDrink_PlayRecords');
const CoffeeBean_FindMyMeow_PlayRecords = require('../entities/CoffeeBean_FindMyMeow_PlayRecords');

function defineRelationships() {
  // Define associations between entities
  KubKaoKabKang_PasteScrumble_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
  Users.hasMany(KubKaoKabKang_PasteScrumble_PlayRecords, { foreignKey: 'user_id' });

  // ... other associations
}

module.exports.defineRelationships = defineRelationships;
