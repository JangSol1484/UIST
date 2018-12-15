const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db')

const router = express.Router();

router.get('/lecture', (req, res, next) => {
  let part = req.query.query;
  db.searchLectureByTitle(part, (err, result) => {
    
    for (let i = 0; i < result.length; i++) {
      try {
        let thumbnail = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', result[i].l_thum));
        result[i].l_thum = new Buffer(thumbnail).toString('base64');
      } catch (e) {
        console.log(e);
        result[i].l_thum = null;
      }
    }
    res.send(result);
  });

});


router.get('/user', (req, res, next) => {
  let part = req.query.query;
  db.searchUserByName(part, (err, result) => {
   // console.log(err);
    if(result){
      for(let i = 0; i < result.length; i++){
        if(fs.existsSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + result[i].u_id + '.jpg'))){
          let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + result[i].u_id + '.jpg'));
          result[i].u_thum = new Buffer(imagebytes).toString('base64');
        } else {
          let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'default_user_thumbnail.jpg'));
          result[i].u_thum = new Buffer(imagebytes).toString('base64');
        }
      }
    }
    res.json(result);
  });
});

module.exports = router;