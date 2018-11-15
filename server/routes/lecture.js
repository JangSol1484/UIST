const express = require('express');
const path = require('path');
const db = require('../db')

const router = express.Router();

router.get('/', (req, res, next) => {
  db.getLectureWithNewest((err, newest) => {
    db.getLectureWithPopularity((err, popular) => {
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
