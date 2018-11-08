const express = require('express');
const path = require('path');
const db = require('../db')

const router = express.Router();

router.get('/', async (req, res) => {

  let lecture = await db.findLectureAll();
  //console.log(lecture);
  res.json({lecture});
});

router.get('/:id', function (req, res, next) {
  let id = parseInt(req.params.id, 10)
  let movie = movies.filter(function (movie) {
    return movie.id === id
  });
  res.send(movie)
});

router.get('/:id/:no', async (req, res, next) => {
  await db.increaseView(req.params.id, req.params.no);
  let [lecture] = await db.findLecture(req.params.id, req.params.no);
  res.json(lecture);
});

module.exports = router;
