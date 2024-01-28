// // import
// const <<moduleNickname>> = require('<<modulePath>>')

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }



// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }
exports.claim_reward = (req, res) => {
    let user = {
        name: "Ote"
    }
    res.render('claim_reward', { user })
}