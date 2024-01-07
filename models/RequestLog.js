const RequestLogs = require('../entities/RequestLogs');

// Function to get all Request Logs
async function getAllRequestLogs() {
    try {
        const all_request_logs = await RequestLogs.findAll();
        var request_log_list = [];
        for (i in all_request_logs) {
            request_log_list.push(all_request_logs[i].dataValues);
        }
        return request_log_list;
    } catch (error) {
        throw error;
    }
}

// Function to create a Request Logs
async function createRequestLogs(req) {
    try {
        const request_log = await RequestLogs.create(req);
        return request_log;
    } catch (error) {
        throw error;
    }
}

// // Function to update a Request Logs
// async function updateRequestLogs(req) {
//     try {
//         const request_log = await RequestLogs.update(req, {
//             where: {
//                 request_id: req.body.request_id
//             }
//         });
//         return request_log;
//     } catch (error) {
//         throw error;
//     }
// }

// Function to delete a Request Logs
async function deleteRequestLogs(req) {
    try {
        const request_log = await RequestLogs.destroy({
            where: {
                request_id: req.body.request_id
            }
        });
        return request_log;
    } catch (error) {
        throw error;
    }
}


// Exporting functions
module.exports = {
    getAllRequestLogs,
    createRequestLogs,
    // updateRequestLogs,
    deleteRequestLogs
};
