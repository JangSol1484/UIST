const express = require('express');
const path = require('path');
const fs = require('fs');

const db = require('../db');

const router = express.Router();

router.get('/:category', (req, res) => {
  let category = req.params.category;
  db.getLectureByCategory(category, (err, rows) => {
    res.send(rows);
  });
});

module.exports = router;