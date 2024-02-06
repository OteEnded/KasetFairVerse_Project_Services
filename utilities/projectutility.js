const file_sys = require('fs');

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
    console.log("projectutility[getConfig]: ☆★ CONFIG DATA IS GOTTEN! ★☆.")
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

const logToTextFile = (...args) => {
    // Get the current time
    const currentTime = new Date().toLocaleTimeString();

    // Combine all log arguments into a single string
    const logMessage = `[${currentTime}] ${args.join(' ')}`;

    // Append the log message with the current time to a text file
    file_sys.appendFileSync('./log/log.txt', logMessage + '\n');

    // Log the message with the current time to the console
    console.log(logMessage);
};


module.exports = {
    readJSONFile,
    getConfig,
    getPort,
    objLen,
    getRandomIntInRange,
    logToTextFile
}