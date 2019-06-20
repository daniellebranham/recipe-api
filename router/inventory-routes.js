const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/models');

const parser = bodyParser.json();
const router = express.Router();

router.use(parser);

router.get('/inventory', (req, res) => {
    User.find(
        { Username: req.query.Username },
        { Inventory: 1 },
        (err, inventory) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: false, data: 'joey' });
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
