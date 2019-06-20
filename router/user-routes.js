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

router.get('/findUser', (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: user });
    });
});

router.put('/updateUser', (req, res) => {
    User.findByIdAndUpdate(
        req.body.id,
        req.body,
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: user });
        }
    );
});

router.delete('/deleteUser', (req, res) => {
    User.findByIdAndRemove(req.body.id, (err, user) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/addUser', (req, res) => {
    try {
        User.findOne({ Username: req.body.Username }, (err, user) => {
            if (user) {
                return res.json({
                    success: false,
                    data: 'Username already exists.',
                });
            }
            const newUser = new User(req.body);
            newUser.save();
            return res.json({ success: true, data: newUser });
        });
    } catch (err) {
        //res.json({ success: false, error: err });
        res.status(500).send(err);
    }
});

//add login method
router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({ Username: req.body.Username }, (err, userFound) => {
        if (!userFound) {
            return res.json({ success: false, data: 'Username not found' });
        }
        if (err) return res.json({ succes: false, data: err });

        const user = userFound;
        if (user.Password !== req.body.Password) {
            return res.json({ success: false, data: 'Invalid Password' });
        }

        return res.json({ success: true });
    });
});

module.exports = router;
