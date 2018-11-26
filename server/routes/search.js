const express = require('express');
const db = require('../db')

const router = express.Router();

router.get('/lecture', (req, res, next) => {
  let part = req.query.query;
  db.searchLectureByTitle(part, (err, result) => {
    res.send(result);
  });

});

router.get('/user', (req, res, next) => {
  let part = req.query.query;
  db.searchUserByName(part, (err, result) => {
   // console.log(err);
    res.send(result);
  });
});

module.exports = router;