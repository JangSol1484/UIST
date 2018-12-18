const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const auth = require('../auth');

const router = express.Router();

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

router.get('/:id', auth.ensureAuth(), (req, res, next) => {
  db.getLectureById(req.params.id, (err, lecture) => { //수정완료

    db.searchLecturePartitioning((err, result) => {

      if (!result) {
        res.status(401);
      } else {
        let categoryInfo = new Array();
        let Info
        let Info_tmp
        let flag = 'a'

        if(lecture)
        {
          for(let i=0; i<lecture.length; i++)
          {
            Info = new Object();
                if(flag != lecture[i].l_category[0])
                {
                  Info.c_level0 = lecture[i].l_category[0];
                  Info.c_level1 = '00';
                  for(let j=0; j<result.length; j++)
                    if(result[j].c_level0 == Info.c_level0)
                      Info.c_name = result[j].c_name;
                  categoryInfo.push(Info);
                } //X00 DATA

            Info = new Object();
            Info.c_level0 = lecture[i].l_category[0];
            Info.c_level1 = lecture[i].l_category.slice(1,3);
            Info.c_name = lecture[i].l_c_name;
            categoryInfo.push(Info)
          }
        }

        for (let i = 0; i < lecture.length; i++) {
          try {
            let thumbnail = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', lecture[i].l_thum));
            lecture[i].l_thum = new Buffer(thumbnail).toString('base64');
          } catch (e) {
            lecture[i].l_thum = null;
          }
        }
      
        res.json({lecture, categoryInfo});
      }
    })
  });
});

router.get('/:id/:no', (req, res, next) => {
  db.getLectureByNo(req.params.id, req.params.no, (err, [lecture]) => {

    let user = null;
    try { user = auth.verify(req.headers.authorization); } catch (e) {user = new Object();user.id = -1}

    db.getSubscribed(lecture.l_wr_id, (err, [result]) => {
      let subscribed = result.u_follower

      db.getIsSubscribed(user.id, result.u_no, (err, [result]) => {
        let subscribe = false
        if(result){
          subscribe = true
        }
        db.getIsLiked(user.id, lecture.l_idx, (err, [result]) => {
          let like = false
          if(result){
            like = true
          }
          db.increaseView(req.params.id, req.params.no);
    
          res.json({lecture, like, subscribe, subscribed});
        })
      })
    })
  })
})

router.get('/like/:id/:no', (req, res, next) => {
  
  let user;
  try { user = auth.verify(req.headers.authorization); } catch (e) {user = new Object();user.id = -1}

  if (user.id !== -1) {
    db.handleLike(user.id, req.params.id, req.params.no, (result) => {
      if(result == true){
        res.send('T');
      } else {
        res.send('F');
      }
    })
  } else {
    res.send('E');
  }
});

module.exports = router;
