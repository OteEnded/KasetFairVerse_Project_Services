// Import here

// define a function here
function myfun() {
    return "Hello";
}

exports.test = (req, res) => {
    // Replace this with your logic to fetch user data from a database or any other source
    const test = { e: "Hello" };

    // Render the 'users' view and pass the user data to it
    res.render('test/test2', { test, myfun });
};

exports.test2 = (req, res) => {

    const users = [
        { id: 1, name: "A" },
    ]

    const test_q = req.query.test

    // Replace this with your logic to fetch user data from a database or any other source
    const test = { e: "W" };

    // Render the 'users' view and pass the user data to it
    res.render('test/test2', { test, myfun, test_q, users });
};


const Html5QrcodeScanner = require('html5-qrcode');

exports.test3 = (req, res) => {
    const users = [
        { id: 1, name: "A" },
    ]

    const test = "Test"

    res.render('test/test3', { test, users });
};