const express = require('express');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ffmpeg = require('ffmpeg');
const ThumbnailGenerator = require('video-thumbnail-generator').default;

const auth = require('../auth');
const db = require('../db')

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  const user = auth.verify(req.headers.authorization);
  const writer = await db.findUserByNo(user.id);
  
  let title;
  let text;
  let fileName;
  let size;
  let filetype;

  let form = new multiparty.Form();

  form.on('field', (name, value) => {
    //console.log('nomal field / name = ' + name + ' value = ' + value);
    if (name === 'title') title = value;
    else if (name === 'text') text = value;
  })

  form.on('part', (part) => {

    const tmp = part.headers['content-type'].split('/');
    filetype = tmp[1];
    
    if (part.filename) {
      fileName = crypto.createHash('sha256').update(writer+part.filename).digest('base64').replace('+','');
      size = part.byteCount;
    } else {
      part.resume();
    }

    console.log('Write Streaming file : ' + fileName + '.' + filetype);
    let writeStream = fs.createWriteStream(path.join(__dirname, '..', 'contents', 'video', fileName + '.' + filetype));
    writeStream.filename = fileName + '.' + filetype;
    part.pipe(writeStream);

    part.on('data', (chunk) => {
      //console.log(fileName + '.' + filetype + ' read ' + chunk.length + ' bytes');
    });

    part.on('end', () => {
      console.log(fileName + '.' + filetype + 'Part read complete');
      writeStream.end();
    });
  });

  form.on('close', () => {
    const tg = new ThumbnailGenerator({
      sourcePath: path.join(__dirname, '..', 'contents', 'video', fileName + '.' + filetype),
      thumbnailPath: path.join(__dirname, '..', 'contents', 'img', 'thumbnail')
    });
  
    tg.generateOneByPercent(10).then( async (thum) => {
      await db.registerLecture(title, text, writer, fileName, filetype, thum);
    });;
    res.status(200).send('Upload Complete');
  });

  form.on('progress', (byteRead, byteExpected) => {
    //console.log('Reading total ' + byteRead + ' / ' + byteExpected);
    //res.status(206).send('Reading total ' + byteRead + ' / ' + byteExpected);
  });

  form.parse(req);

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
      console.log('streaming end');
      res.end();
    })
    stream.on('error', (err) => {
      console.log(err);
      res.end('500 Internal Server' + err);
    })
  }
  else {
    res.send('<script>alert("잘못된 접근입니다.");history.back();</script>');
  }
})

router.get('/thumbnail/:id', (req, res) => {
  id = req.params.id;
  res.sendFile(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', id));
})
  
module.exports = router;