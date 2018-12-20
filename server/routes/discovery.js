const express = require('express');
const path = require('path');
const fs = require('fs');

const db = require('../db');

const router = express.Router();

router.get('/:category/:offset', (req, res) => {
  let category = req.params.category;
  let offset = req.params.offset;
  db.getLectureByCategory(category, offset, (err, cnt, discovery) => {
    if (discovery) {
      for (let i = 0; i < discovery.length; i++) {
        try {
          let thumbnail = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', discovery[i].l_thum));
          discovery[i].l_thum = new Buffer(thumbnail).toString('base64');
        } catch (e) {
          discovery[i].l_thum = null;
        }
      }
    } else {
      discovery = false
    }

    res.json({cnt, discovery});
  });
});

module.exports = router;