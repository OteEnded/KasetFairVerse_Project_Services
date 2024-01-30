// services/apimiddleware.js
const putil = require('../utilities/projectutility');
const RequestLog = require('../models/RequestLog');
const dbconnector = require('../services/dbconnector');

api_permission_groups = null

function validate_api_permission_groups_config_structure(checking_api_permission_groups){
    console.log("apimiddleware[validate_api_permission_groups_config_structure]: Checking api_permission_groups config structure...")
    if (checking_api_permission_groups == null) { return false }
    if (Object.keys(checking_api_permission_groups).length === 0) { return false }
    for (let i in checking_api_permission_groups){
        if (!Object.keys(checking_api_permission_groups[i]).includes("keys")) { return false }
        if (!Object.keys(checking_api_permission_groups[i]).includes("permissions")) { return false }
        if (Object.keys(checking_api_permission_groups[i]["permissions"]).length === 0) { return false }
        for (let j in checking_api_permission_groups[i]["permissions"]){
            if (!Object.keys(checking_api_permission_groups[i]["permissions"][j]).includes("read")) { return false }
            if (!Object.keys(checking_api_permission_groups[i]["permissions"][j]).includes("write")) { return false }
        }
    }
    return true
}

function load_api_permission_groups(){
    checking_api_permission_groups = putil.getConfig()["api_permission_groups"]
    if (!validate_api_permission_groups_config_structure(checking_api_permission_groups)) {
        // throw new Error("ApiMiddleware[load_api_permission_groups]: ERROR, api_permission_groups config is not valid.")
        console.error("ApiMiddleware[load_api_permission_groups]: ERROR, api_permission_groups config is not valid.")
        process.exit(1)
    }
    api_permission_groups = checking_api_permission_groups
}

function find_matching_group(key){
    for (let i in api_permission_groups){
        // console.log(i)
        // console.log("apimiddleware[find_matching_group]: Checking if key ->", key, "matches with ->", api_permission_groups[i]['keys'])
        if (api_permission_groups[i]['keys'].includes(key)){
            return i
        }
    }
    return ""
}

function is_allowed(req){
    console.log("apimiddleware[is_allowed]: Checking if request is allowed...")
    load_api_permission_groups()
    let permission_group = find_matching_group(req.headers['api-key'])
    console.log("apimiddleware[is_allowed]: permission_group ->", permission_group)
    if (permission_group === ""){
        return false
    }
    // console.log("api_permission_groups", api_permission_groups)
    if (Object.keys(api_permission_groups[permission_group]["permissions"]).includes("*")){
        if (req.method === "GET" && api_permission_groups[permission_group]["permissions"]["*"]["read"]){
            return true
        }
        if (api_permission_groups[permission_group]["permissions"]["*"]["write"]){
            return true
        }
    }
    if (Object.keys(api_permission_groups[permission_group]["permissions"]).includes(req.originalUrl.split("/")[2])){
        if (req.method === "GET" && api_permission_groups[permission_group]["permissions"][req.originalUrl.split("/")[2]]["read"]){
            return true
        }
        if (api_permission_groups[permission_group]["permissions"][req.originalUrl.split("/")[2]]["write"]){
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
            request_protocol: req.protocol,
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
