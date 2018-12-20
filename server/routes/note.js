const express = require('express');
const path = require('path');
const multiparty = require('multiparty');
const router = express.Router();
const db = require('../db');
const auth = require('../auth');

router.get('/:lidx', auth.ensureAuth(), (req, res) => {

    let uno = req.user.id
    let lidx = req.params.lidx

    db.getNote(uno, lidx, (err, [result]) => {
        if (result) {
            res.send(result.n_text)
        } else {
            res.send(null)
        }
    })
})

router.post('/:lidx', auth.ensureAuth(), (req, res) => {
    let uno = req.user.id
    let lidx = req.params.lidx
    let note
    let form = new multiparty.Form()

    form.on('field', (name, value) => {
        //console.log('nomal field / name = ' + name + ' value = ' + value)
        if (name === 'note') note = value
    });

    form.on('close', () => {

        db.registerNote(uno, lidx, note, (err) => {

            console.log(err)
            res.send('T')
        })
    })

    form.parse(req);
})



module.exports = router;
