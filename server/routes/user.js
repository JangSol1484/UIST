const express = require('express');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');

const auth = require('../auth');
const db = require('../db');

const router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {

  let user;
  try { user = auth.verify(req.headers.authorization); } catch (e) {}

  db.findUserByNo(user.id, (err, [rows]) => {
    user = user ? rows.u_name : '';
    res.json({username: `${user}`});
  });
});

router.get('/my', auth.ensureAuth(), (req, res) => {
  db.findUserByNo(req.user.id, (err, [user]) => {
    db.searchMySubscribe(req.user.id, (err, result) => {
      if(err){
        res.status(401);
      }
      else{
        let sublist = new Array()
        let people;

        if(result)
        for(let i=0; i<result.length; i++)
        {
          people = new Object();
          people.bj = result[i].u_name;          

          if(fs.existsSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + people.bj.toString() + '.jpg'))){
            let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + people.bj.toString() + '.jpg'));
            people.bjThumbnail = new Buffer(imagebytes).toString('base64');
            sublist.push(people);
          } else {
            let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'default_user_thumbnail.jpg'));
            people.bjThumbnail = new Buffer(imagebytes).toString('base64');
            sublist.push(people);
          }          
        }
        console.log(sublist);
        
        res.json({user,sublist})
      }
    })
  });
});

router.get('/my/class', auth.ensureAuth(), (req, res) => {
  db.findUserByNo(req.user.id, (err,user) => {
    if(err) {res.status(401);}
    else {
    let smallUserInfo = new Array();
    let info = new Object();

    info.follower = user[0].u_follower
    info.lectures = user[0].u_lectures

    smallUserInfo.push(info);
    console.log(smallUserInfo);
    res.json(smallUserInfo);
    }
  });
});

router.post('/signup', (req, res, next) => {//회원가입
  db.registerUser(req.body, (err) => {
    if(err){
      res.status(500).send(false);
    } else {
      res.status(200).send(true);
    }
  });
});

router.post('/login', (req, res) => {

  let userInfo = {uid: req.body.uid, upw: req.body.upw}
  
  db.findUser(userInfo, (err, [user]) => {
    if(!user || !user.u_no){
      return res.status(401).json({error: 'login failure'});
    }
    let name = user.u_name;
    let accessToken = auth.signToken(user.u_no);
    res.json({name, accessToken});
  });
});

router.post('/update', (req, res) => {

  const user = auth.verify(req.headers.authorization);

  let u_no = user.id;

  let form = new multiparty.Form();
  let u_name;
  let u_email;
  let u_intro;

  form.on('field', (name, value) => {
    console.log('nomal field / name = ' + name + ' value = ' + value);
    if (name === 'name') u_name = value;
    else if (name === 'email') u_email = value;
    else if (name === 'intro') u_intro = value;
  });

  form.on('part', (part) => {

    let writeStream = fs.createWriteStream(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_test.jpg'));
    writeStream.filename = 'thumbnail_test.jpg';
    part.pipe(writeStream);

    part.on('data', (chunk) => {

    });

    part.on('end', () => {
      writeStream.end();
    });
  });

  form.on('close', () => {
    console.log('1')
    let userInfo = {
      u_no: u_no,
      u_name: u_name,
      u_email: u_email,
      u_intro: u_intro
    };
    db.updateUserProfile(userInfo, (err, rows) => {
      if(err){
        console.log(err)
      } else {
        console.log(userInfo)
        res.send('update success');
      }
    });
  });

  form.parse(req);
});

router.get('/thumbnail/:id', (req, res) => {
  
  let id = req.params.id;

  if(fs.existsSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + id.toString() + '.jpg'))){
    let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'thumbnail_' + id.toString() + '.jpg'));
    res.send(new Buffer(imagebytes).toString('base64'));
  } else {
    let imagebytes = fs.readFileSync(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', 'default_user_thumbnail.jpg'));
    res.send(new Buffer(imagebytes).toString('base64'));
  }
});


router.use((err, req, res, next) => {
  res.json({error: err.message});
});

module.exports = router;