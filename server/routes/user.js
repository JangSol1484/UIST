const express = require('express');

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
  })
});

router.post('/signin', (req, res, next) => {//회원가입
  db.registerUser(req.body, (err) => {
    if(err){
      res.send(false);
    } else {
      res.status(200).send(true);
    }
  })
})

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

router.get('/my', auth.ensureAuth(), (req, res) => {
  db.findUserByNo(req.user.id, (err, [user]) => {
    if(err){
      res.status(401);
    }
    else{
      res.json({user});
    }
  });
});

router.get('/my/class', auth.ensureAuth(), (req, res) => {
  res.json({"msg": "myclass"});
})

router.use((err, req, res, next) => {
  res.json({error: err.message});
});

module.exports = router;
