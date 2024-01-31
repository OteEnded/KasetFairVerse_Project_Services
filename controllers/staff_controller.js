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
    res.render('staff/claim_reward', { user })
}

exports.coupon_validation = (req, res) => {
    res.render('staff/coupon_validation')
}