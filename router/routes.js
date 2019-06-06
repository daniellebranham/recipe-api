const express = require('express');
const User = require('../models/models');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            return res.status(500).send(err);
        }
        res.json(users);
    })
});

router.get('/:id', (req, res) => {
     User.findById(req.params.id, (err, user) => {
        if(err){
            return res.status(500).send(err);
        }
        res.json(user);
     })
});

router.put('/:id', (req, res) => {
    req.user.userName = req.body.userName;
    req.user.passWord = req.body.passWord;
    req.user.save();
    res.json(req.user);

}) 

router.patch('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            return res.status(500).send(err);
        }
        if(req.body.id){
            delete req.body.id;
        }
        for(let b in req.body){
            user[b] = req.body[b];
        }
        user.save();
        res.json(user);
    })
})
//delete works, but the success response never comes
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){
            return res.status(500).send(err);
        }
        return res.send.status(200);
    })
});

router.post('/addUser', (req, res) => {
    const newUser = new User(req.body);
    newUser.userName = req.body.userName;
    newUser.passWord = req.body.passWord;
    newUser.save(err => {
        if(err){
            return res.status(500).send(err);
        }
    });
    res.status(201).send(newUser);
});


module.exports = router;