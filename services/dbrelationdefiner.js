// Entity_Relation.js
const Users = require('../entities/Users');
const KubKaoKabKang_PlayRecords = require('../entities/KubKaoKabKang_PlayRecords');

function defineRelationships() {
  // Define associations between entities
  KubKaoKabKang_PlayRecords.belongsTo(Users, { foreignKey: 'user_id' });
  Users.hasMany(KubKaoKabKang_PlayRecords, { foreignKey: 'user_id' });

  // ... other associations
}

module.exports.defineRelationships = defineRelationships;
