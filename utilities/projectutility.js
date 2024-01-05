const file_sys = require('fs');

function debug (...msgs) {
    console.log(msgs)
}

function readJSONFile(filePath){
    console.log("projectutility[readJSONFile]: Reading JSON file from", filePath)
    try {
        const jsonData = file_sys.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        console.log("projectutility[readJSONFile]: Data from", filePath, "can be read successfully and will be return.")
        return data
    } catch (err) {
        console.error('projectutility[readJSONFile]: ERROR, cannot read file from', filePath);
        console.error(err);
        return null
    }
}

function getConfig(){
    console.log("projectutility[getConfig]: Getting config data:")
    configData = readJSONFile('./config.json')
    console.log("projectutility[getConfig]: Config data getted:")
    console.log(configData)
    return configData
}

function getPort(){
    return getConfig().port
}

function listLen(obj){
    var len = 0
    for (i in obj) len++
    return len
}




module.exports.debug = debug
module.exports.readJSONFile = readJSONFile
module.exports.getConfig = getConfig
module.exports.listLen = listLen
module.exports.getPort = getPort