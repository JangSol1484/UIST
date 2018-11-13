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

router.get('/:id', function (req, res, next) {
  let id = parseInt(req.params.id, 10)
  let movie = movies.filter(function (movie) {
    return movie.id === id
  });
  res.send(movie)
});

router.get('/:id/:no', (req, res, next) => {
  db.findLecture(req.params.id, req.params.no, (err, [lecture]) => {
    db.increaseView(req.params.id, req.params.no);
    console.log(lecture.l_no);
    res.json(lecture);
  });
});

module.exports = router;
