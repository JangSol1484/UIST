const express = require('express');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const ThumbnailGenerator = require('video-thumbnail-generator').default;

const auth = require('../auth');
const db = require('../db');

const router = express.Router();

router.post('/upload/userthumbnail', (req, res, next) => {
  let thumbnail = req.body.thumbnail;
  console.log(thumbnail);
  res.send('');
});

router.post('/upload/lecture', (req, res, next) => {
  const user = auth.verify(req.headers.authorization);

  let wr_id;
  let wr_name;
  let cnt;
  let fileName;
  let filetype;
  let size;

  let title;
  let text;
  let category;

  db.findUserByNo(user.id, (err, [rows]) => {
    wr_id = rows.u_id;
    wr_name = rows.u_name;

    db.getNumberofLectures(wr_id, (err, [rows]) => {
      cnt = rows ? rows.u_lectures : 0;
      cnt++;
      fileName = wr_id + '-' + cnt;

      let form = new multiparty.Form();

      form.on('field', (name, value) => {
        //console.log('nomal field / name = ' + name + ' value = ' + value);
        if (name === 'title') title = value;
        else if (name === 'text') text = value;
        else if (name === 'category') category = value;
      })

      form.on('part', (part) => {

        const tmp = part.headers['content-type'].split('/');
        filetype = tmp[1];

        // console.log('Write Streaming file : ' + fileName + '.' + filetype);
        let writeStream = fs.createWriteStream(path.join(__dirname, '..', 'contents', 'video', fileName + '.' + filetype));
        writeStream.filename = fileName + '.' + filetype;
        part.pipe(writeStream);
    
        part.on('data', (chunk) => {
          //console.log(fileName + '.' + filetype + ' read ' + chunk.length + ' bytes');
        });
    
        part.on('end', () => {
          //console.log(fileName + '.' + filetype + 'Part read complete');
          writeStream.end();
        });
      });
    
      form.on('close', () => {
        const tg = new ThumbnailGenerator({
          sourcePath: path.join(__dirname, '..', 'contents', 'video', fileName + '.' + filetype),
          thumbnailPath: path.join(__dirname, '..', 'contents', 'img', 'thumbnail')
        });
      
        tg.generateOneByPercent(10, {
          filename: fileName + '.jpg'
        }).then( (thumb) => {
          l_info = {
            no: cnt,
            category: category,
            title: title,
            text: text,
            wr_id: wr_id,
            wr_name: wr_name,
            fileName: fileName,
            filetype: filetype,
            thumb: thumb
          }
          db.registerLecture(l_info, (err) => {
            if (err) {
              console.log(err)
            } else {
              res.status(200).send('Upload Complete');
            }
          });
        });;
      });
    
      form.on('progress', (byteRead, byteExpected) => {
        //console.log('Reading total ' + byteRead + ' / ' + byteExpected);
        //res.status(206).send('Reading total ' + byteRead + ' / ' + byteExpected);
      });
    
      form.parse(req);
    });
  });
});

router.get('/video', function(req, res, next) {

  let play = req.query.play;
  let file = path.join(__dirname, '../contents/video', play);
  fs.stat(file, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 Error if file not found
        return res.sendStatus(404);
      }
    res.end(err);
    }
    let range = req.headers.range;
    if (!range) {
     // 416 Wrong range
     return res.sendStatus(416);
    }
    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let total = stats.size;
    let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    let chunksize = (end - start) + 1;
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    });
    let stream = fs.createReadStream(file, { start: start, end: end })
    .on("open", function() {
      stream.pipe(res);
    }).on("error", function(err) {
      res.end(err);
    });
  });
});

router.get('/thumbnail/:id', (req, res) => {
  id = req.params.id;
  res.sendFile(path.join(__dirname, '..', 'contents', 'img', 'thumbnail', id));
});

module.exports = router;