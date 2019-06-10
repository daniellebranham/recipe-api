const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/models');

const parser = bodyParser.json();
const router = express.Router();

router.use(parser);

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: users });
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: user });
    });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: user });
        }
    );
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/addUser', (req, res) => {
    try {
        const newUser = new User({
            userName: req.body.userName,
            passWord: req.body.passWord,
        });
        newUser.save();
        res.json({ success: true, data: newUser });
    } catch (err) {
        res.json({ success: false, error: err });
    }
});

module.exports = router;
