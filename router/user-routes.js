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
        User.find({ Username: req.body.Username }, (err, user) => {
            if (user.length) {
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

router.get('/getInventory/:Username', (req, res) => {
    User.find(
        { Username: req.params.Username },
        { Inventory: 1 },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: user });
        }
    );
});
//think about how to save inventory. lots of updates or just resave all inventory?
router.put('/saveInventory/:id', (req, res) => {
    User.findByIdAndUpdate(
        { Inventory: req.params.id },
        { Inventory: req.body },
        { new: true },
        (err, inventory) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: inventory });
        }
    );
});

module.exports = router;
