// Entity_Relation.js
const Users = require('../entities/Users');
const KubKaoKabKang_PasteScrumble_PlayRecords = require('../entities/KubKaoKabKang_PasteScrumble_PlayRecords');

function defineRelationships() {
  // Define associations between entities
  KubKaoKabKang_PasteScrumble_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
  Users.hasMany(KubKaoKabKang_PasteScrumble_PlayRecords, { foreignKey: 'user_id' });

  // ... other associations
}

module.exports.defineRelationships = defineRelationships;
