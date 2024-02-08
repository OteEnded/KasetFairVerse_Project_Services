const file_sys = require('fs');
const path = require('path');

function readJSONFile(filePath){
    log("projectutility[readJSONFile]: Reading JSON file from", filePath)
    try {
        const jsonData = file_sys.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        log("projectutility[readJSONFile]: Data from", filePath, "can be read successfully and will be return.")
        return data
    } catch (err) {
        console.error('projectutility[readJSONFile]: ERROR, cannot read file from', filePath);
        console.error(err);
        return null
    }
}

function getConfig(){
    log("projectutility[getConfig]: Getting config data:")
    configData = readJSONFile('./config.json')
    log("projectutility[getConfig]: ☆★ CONFIG DATA IS GOTTEN! ★☆.")
    // console.log.txt(configData)
    return configData
}

function getPort(){
    return getConfig().port
}

function objLen(obj){
    return Object.keys(obj).length;
}

function getRandomIntInRange(min = null, max = null){
    if (min == null) return Math.random();
    if (max == null){
        max = min
        min = 0
    }
    if(min > max){
        [min, max] = [max, min]
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (file_sys.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    file_sys.mkdirSync(dirname);
}

const log = (...args) => {
    try {
        // Get the current time
        const currentTime = new Date().toLocaleTimeString();

        // Combine all log arguments into a single string
        const logMessage = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');

        // Ensure the log directory exists
        ensureDirectoryExistence('./log/log.txt');

        // Append the log message with the current time to a text file
        file_sys.appendFileSync('./log/log.txt', `[${currentTime}] ${logMessage}\n`);

        // Log the message with the current time to the console
        console.log(`[${currentTime}] ${logMessage}`);
    }
    catch (err) {
        console.error('projectutility[log]: ERROR, cannot log message to file');
        console.error(err);
        console.log(...args);
    }
};

module.exports = {
    readJSONFile,
    getConfig,
    getPort,
    objLen,
    getRandomIntInRange,
    log
}