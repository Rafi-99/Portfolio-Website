const express = require("express");
const path = require('path');

let router = express.Router();

router.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'about.html'));
});

module.exports = router;