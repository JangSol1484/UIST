const express = require('express');

const auth = require('../auth');
const db = require('../db');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {

  let user;
  try {
    user = auth.verify(req.headers.authorization);
  }
  catch (e) {

  }
  
  user = user ? await db.findUserByNo(user.id) : '';
  res.json({login: `${user}`});
});

router.post('/signin', async(req, res, next) => {
  let result = await db.registerUser(req.body);
  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
})

router.post('/login', async (req, res) => {
  let uid = req.body.uid;
  let upw = req.body.upw;

  let [user] = await db.findUser(uid, upw);
  //console.log(user);

  if(!user || !user.u_no){
    //console.log(uid, upw, user);
    return res.status(401).json({error: 'login failure'});
  } 
//  db.createAccessLog({userId: user.no});//await
  let accessToken = auth.signToken(user.u_no);

  //console.log(accessToken);

  res.json({accessToken});
});

router.get('/my', auth.ensureAuth(), async (req, res) => {
  let user = await db.findUserByNo(req.user.id);
  //let accessLog = await db.findAccessLog({userId: user.id});

  //console.log({user, accessLog});
  res.json({user});
});

router.get('/my/class', auth.ensureAuth(), async (req, res) => {
  res.json({"msg": "myclass"});
})

router.use((err, req, res, next) => {
  //console.log(err);
  res.json({error: err.message});
});

module.exports = router;
