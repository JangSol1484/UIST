const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db')

const router = express.Router();

router.get('/', (req,res) => {
    db.getAllCategory((err,result) => {
        
        //console.log(result);
        res.json(result);
    })
})

module.exports = router;