const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

router.get('/video', function (req, res,next) {
    db.getNote((err,result) => {
        //console.log(result);
        res.json(result);
    })
});

router.post('/video', function(req,res) {
    let text = req.body.txt;

    let substr=[];
    let stamp=[];

    text = text.replace(/\n/gi,'');
    text = text.replace(/\r/gi,'');

    console.log(text);
    let tmp = text.split('#');

    for(index = 1; index < tmp.length; index++){
        stamp[index-1] = tmp[index].substring(0,6);
        substr[index-1] = tmp[index].substring(6, tmp[index].length);
        }
        console.log(tmp.length);

    for(let i=0; i< tmp.length-1; i++)
       db.insertNote('ac3456','1',substr[i],stamp[i]); //현재 로그인한 세션의 유저 정보, 보고있는 비디오정보 받아와야.
   
    res.send('hello');
})

router.post('/:lidx', auth.ensureAuth(), (req, res) => {
    let uno = req.user.id
    let lidx = req.params.lidx
    let note = req.body

    console.log(req.body)

    res.seed('T')
})

module.exports = router;
