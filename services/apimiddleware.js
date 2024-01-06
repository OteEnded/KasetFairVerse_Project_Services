const putil = require('../utilities/projectutility');

api_permission_group = null

function validate_api_permission_group_config_structure(checking_api_permission_group){
    if (checking_api_permission_group == null){
        return false
    }
    if (Object.keys(checking_api_permission_group).length == 0){
        return false
    }
    for (let i in checking_api_permission_group){
        if (!Object.keys(checking_api_permission_group[i]).includes("keys")){
            return false
        }
        if (!Object.keys(checking_api_permission_group[i]).includes("permission")){
            return false
        }

        if (Object.keys(checking_api_permission_group[i]["permission"]).length == 0){
            return false
        }
        for (let j in checking_api_permission_group[i]["permission"]){
            if (!Object.keys(checking_api_permission_group[i]["permission"][j]).includes("read")){
                return false
            }
            if (!Object.keys(checking_api_permission_group[i]["permission"][j]).includes("write")){
                return false
            }
        }
    }
    return true
}

function load_api_permission_group(){
    checking_api_permission_group = putil.getConfig()["api_permission_group"]
    if (!validate_api_permission_group_config_structure(checking_api_permission_group)){
        console.error("ApiMiddleware[load_api_permission_group]: ERROR, api_permission_group config is not valid.")
        process.exit(1)
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
    load_api_permission_group()
    permission_group = find_matching_group(req.headers['api-key'])
    if (permission_group == ""){
        return false
    }
    // console.log("api_permission_group", api_permission_group)
    // console.log("permission_group", permission_group)
    if (Object.keys(api_permission_group[permission_group]["permission"]).includes("*")){
        return true
    }
    if (Object.keys(api_permission_group[permission_group]["permission"]).includes(req.originalUrl.split("/")[1])){
        if (req.method == "GET" && api_permission_group[permission_group]["permission"][req.originalUrl.split("/")[1]]["read"]){
            return true
        }
        if (api_permission_group[permission_group]["permission"][req.originalUrl.split("/")[1]]["write"]){
            return true
        }
    }
    
    return false
}


// services/apimiddleware.js
function authenticate(req, res, next) {
    // Your authentication logic here
    req.originalUrl
    if (!is_allowed(req)) {

        console.log("ApiMiddleware[authenticate]: These is a unauthorized request from ->", req.ip,
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

function logRequest(req, res, next) {
    // Logging logic here+
    console.log(`Request IP: ${req.ip}`);
    console.log(`Request Header: ${req.headers}`);
    console.log(`Request Body: ${req.body}`);
    next();
}

module.exports = {
    authenticate,
    logRequest,
};
