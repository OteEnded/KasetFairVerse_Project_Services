const putil = require('../utilities/projectutility')

configData = putil.getConfig()
console.log(configData['database_in_use'][1])
console.log(configData['database_listing']['sql'])

// console.log(configData['database_in_use'][1] in configData['database_listing']['sql'])

next_condition = (configData['database_listing'][configData['database_in_use'][0]][configData['database_in_use'][1]]['name'].hasOwnProperty(configData['database_in_use'][2]))
console.log(next_condition)