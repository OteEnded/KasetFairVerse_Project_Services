// services/apimiddleware.js
const putil = require('../utilities/projectutility');
const RequestLog = require('../models/RequestLog');
const dbconnector = require('../services/dbconnector');

api_permission_group = null

function validate_api_permission_group_config_structure(checking_api_permission_group){
    if (checking_api_permission_group == null) { return false }
    if (Object.keys(checking_api_permission_group).length === 0) { return false }
    for (let i in checking_api_permission_group){
        if (!Object.keys(checking_api_permission_group[i]).includes("keys")) { return false }
        if (!Object.keys(checking_api_permission_group[i]).includes("permissions")) { return false }
        if (Object.keys(checking_api_permission_group[i]["permissions"]).length === 0) { return false }
        for (let j in checking_api_permission_group[i]["permissions"]){
            if (!Object.keys(checking_api_permission_group[i]["permissions"][j]).includes("read")) { return false }
            if (!Object.keys(checking_api_permission_group[i]["permissions"][j]).includes("write")) { return false }
        }
    }
    return true
}

function load_api_permission_group(){
    checking_api_permission_group = putil.getConfig()["api_permission_group"]
    if (!validate_api_permission_group_config_structure(checking_api_permission_group)) {
        throw new Error("ApiMiddleware[load_api_permission_group]: ERROR, api_permission_group config is not valid.")
        // console.error("ApiMiddleware[load_api_permission_group]: ERROR, api_permission_group config is not valid.")
        // process.exit(1)
    }
    api_permission_group = checking_api_permission_group
}

function find_matching_group(key){
    for (let i in api_permission_group){
        if (api_permission_group[i]['keys'] == key){
            return i
        }
    }
    return ""
}

function is_allowed(req){
    console.log("apimiddleware[is_allowed]: Checking if request is allowed...")
    load_api_permission_group()
    let permission_group = find_matching_group(req.headers['api-key'])
    console.log("apimiddleware[is_allowed]: permission_group ->", permission_group)
    if (permission_group === ""){
        return false
    }
    // console.log("api_permission_group", api_permission_group)
    if (Object.keys(api_permission_group[permission_group]["permissions"]).includes("*")){
        if (req.method === "GET" && api_permission_group[permission_group]["permissions"]["*"]["read"]){
            return true
        }
        if (api_permission_group[permission_group]["permissions"]["*"]["write"]){
            return true
        }
    }
    if (Object.keys(api_permission_group[permission_group]["permissions"]).includes(req.originalUrl.split("/")[1])){
        if (req.method === "GET" && api_permission_group[permission_group]["permissions"][req.originalUrl.split("/")[1]]["read"]){
            return true
        }
        if (api_permission_group[permission_group]["permissions"][req.originalUrl.split("/")[1]]["write"]){
            return true
        }
    }
    
    return false
}


function authenticate(req, res, next) {
    // Your authentication logic here
    if (!is_allowed(req)) {

        console.log("apimiddleware[authenticate]: These is a unauthorized request from ->", req.ip,
        "\nwith header ->", req.headers,
        "\nwith body ->", req.body,
        "\nrequest to url ->", req.originalUrl)

        res.status(401).json({
            is_success: false,
            message: "Unauthorized",
            status: 401,
            content: {
                error: "Invalid API key; it does not recognize or does not have permission to perform your request."
            }
        });

        return
    }
    return next();
    
}

async function logRequest(req, res, next) {
    // Logging logic here

    // check if there is table RequestLogs in database
    let dbconnection = dbconnector.getConnection();
    let [results, metadata]  = await dbconnection.query('show tables')
    let existing_tables = results.map((result) => {
        return result[Object.keys(result)[0]]
    });
    console.log("apimiddleware[logRequest]: Checking if RequestLogs table exists...")
    // console.log(existing_tables)
    if (existing_tables.includes('requestlogs')) {
        console.log("apimiddleware[logRequest]: RequestLogs table exists, logging request...")
        let log = {
            requester_ip: req.ip,
            request_to: req.hostname + req.originalUrl,
            request_method: req.method,
            request_header: req.headers,
            request_body: req.body
        }
        console.log("apimiddleware[logRequest]: Logging request ->", log)
        await RequestLog.createRequestLogs(log)
    }
    else {
        console.log("apimiddleware[logRequest]: Cannot log request, RequestLogs table does not exist.")
    }

    next();
}

module.exports = {
    authenticate,
    logRequest
};
