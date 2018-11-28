const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db')

const router = express.Router();

router.get('/testapi', (req, res, next) => {
  db.testapi((err, rows) => {
    res.json(rows);
  })
})

router.get('/', (req, res, next) => {
  db.getLectureWithNewest((err, newest) => {
    if (newest) {
      for (let i = 0; i < newest.length; i++) {
        try {
          let thumbnail = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', newest[i].l_thum));
          newest[i].l_thum = new Buffer(thumbnail).toString('base64');
        } catch (e) {
          newest[i].l_thum = null;
        }
      }
    } else {
      newest = null;
    }

    db.getLectureWithPopularity((err, popular) => {
      if (popular) {
        for (let i = 0; i < popular.length; i++) {
          try {
            let thumbnail = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', popular[i].l_thum));
            popular[i].l_thum = new Buffer(thumbnail).toString('base64');
          } catch (e) {
            popular[i].l_thum = null;
          }
        }
      } else {
        popular = null
      }
      res.json({newest, popular});
    })
  });
});

router.get('/:id', (req, res, next) => {
  db.getLectureById(req.params.id, (err, lecture) => {
    res.json(lecture);
  });
});

router.get('/:id/:no', (req, res, next) => {
  db.getLectureByNo(req.params.id, req.params.no, (err, [lecture]) => {
    db.increaseView(req.params.id, req.params.no);
    res.json(lecture);
  });
});

module.exports = router;
