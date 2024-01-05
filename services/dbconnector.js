const { Sequelize } = require('sequelize');

const putil = require('../utilities/projectutility')

connection = null;

function varidateConfig(configData){

    let next_condition = false
    console.log("sqlconnector[varidateConfig]: varidating database_in_use config->", configData['database_in_use'])

    next_condition = (configData['database_in_use'][0] != "sql")
    if (next_condition){
        console.log(
            "sqlconnector[varidateConfig]: ABORT, database_in_use is not set to 'sql' in config file."
        )
        return false
    }

    next_condition = (putil.listLen(configData['database_in_use']) != 3)
    if (next_condition){
        console.log(
            "sqlconnector[varidateConfig]: ABORT, database_in_use in config file is not in a right sql config format.\n" +
            "(require length 3, given " + putil.listLen(database_in_use) + ")."
        )
        return false
    }

    next_condition = !(configData['database_in_use'][1] in configData['database_listing']['sql'])
    if (next_condition){
        console.log(
            "sqlconnector[varidateConfig]: ABORT, cannot find database_host_type-> '" +
            configData['database_in_use'][1] +
            "' in database_listing config"
        )
        return false
    }

    next_condition = !(configData['database_listing'][configData['database_in_use'][0]][configData['database_in_use'][1]]['name'].hasOwnProperty(configData['database_in_use'][2]))
    if (next_condition){
        console.log(
            "sqlconnector[varidateConfig]: ABORT, cannot find database_name-> '" +
            configData['database_in_use'][2] +
            "' in database_listing config"
        )
        return false
    }

    console.log("sqlconnector[varidateConfig]: varidation passed.")
    return true
}

function connect(){

    console.log("sqlconnector[connect]: Connecting...")

    configData = putil.getConfig()
    database_in_use = configData['database_in_use']

    if (!varidateConfig(configData)){
        process.exit(1);
        // return false
    }

    db_connectinfo = {
        host: configData['database_listing'][database_in_use[0]][database_in_use[1]]['host'],
        user: configData['database_listing'][database_in_use[0]][database_in_use[1]]['user'],
        password: configData['database_listing'][database_in_use[0]][database_in_use[1]]['password'],
        database: configData['database_listing'][database_in_use[0]][database_in_use[1]]['name'][database_in_use[2]]
    }

    connection = new Sequelize(db_connectinfo.database, db_connectinfo.user, db_connectinfo.password,
        {
        host: db_connectinfo.host,
        dialect: 'mysql'
        }
    )
    
    connection
    .authenticate()
    .then(() => {
        console.log('sqlconnector[connect]: Database connected successfully!'); //->', connection.connectionManager.sequelize);
    })
    .catch((err) => {
        console.error('sqlconnector[connect]: Unable to connect to the database:', err);
        process.exit(1);
    });
}

function getConnection(){
    console.log("sqlconnector[getConnection]: Getting connection...")
    if (connection == null){
        console.log("sqlconnector[getConnection]: connection is null, invoking connect()...")
        connect()
    }
    return connection
}

module.exports.getConnection = getConnection
module.exports.connection = connection
module.exports.connect = connect