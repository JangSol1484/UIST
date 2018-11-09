const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const auth = require('../auth');
const db = require('../db')

const router = express.Router();

//router.use('/uploadfile', express.static('../contents'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'contents/video/')
  },
  filename: async (req, file, cb) => {

    const user = auth.verify(req.headers.authorization);
    const writer = await db.findUserByNo(user.id);

    const tmp = file.mimetype.split('/');
    const type = tmp[1];

    let fileName = crypto.createHash('sha256').update(writer+file.originalname).digest('base64');

    cb(null, fileName + '.' + type);
  }
});
const upload = multer({storage: storage});

router.post('/upload', upload.single('userfile'), async (req, res, next) => {
  const user = auth.verify(req.headers.authorization);
  const writer = await db.findUserByNo(user.id);

  const tmp = req.file.mimetype.split('/');
  const filetype = tmp[1];

  let fileName = crypto.createHash('sha256').update(writer+req.file.originalname).digest('base64');

  await db.registerLecture(req.body.title, req.body.text, writer, fileName, filetype, ' ');
  res.send('success');
});

router.get('/video', function(req, res, next) {
  
  if(req.query.play){
    let play = req.query.play;
    let stream = fs.createReadStream(path.join(__dirname, '../contents/video', play));
    let count = 0;
    stream.on('data', (data) => {
      count++;
      //console.log("count", count);
      res.write(data);
    })
    stream.on('end', () => {
      //console.log('streaming end');
      res.end();
    })
    stream.on('error', (err) => {
      //console.log(err);
      res.end('500 Internal Server' + err);
    })
  }
  else {
    res.send('<script>alert("잘못된 접근입니다.");history.back();</script>');
   }
})
  
module.exports = router;