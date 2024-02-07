const request = require('request');

const putil = require('../utilities/projectutility')

async function requestToBBT(access_token, query, variables = {}) {

    putil.log("apirequester[requestToBBT]: sending request with access_token =", access_token, "query =", query, "variables =", variables);

    try {
        const options = {
            'method': 'POST',
            'url': 'https://apisix-gateway.bigbangtheory.io/graphql/portal',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        putil.log("apirequester[requestToBBT]: response.body =", response.body)
                        const responseData = JSON.parse(response.body);
                        resolve(responseData);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    requestToBBT
};