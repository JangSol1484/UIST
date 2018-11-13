const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db')

router.get('/video', function (req, res, next) {
    let note = await db.getnote();
    res.json({note});
});


module.exports = router;
