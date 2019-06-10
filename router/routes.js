const express = require('express');
const User = require('../models/models');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();

router.get('/', (req, res) => {
    try{
        User.find({}, (err, users) => {
            res.json(users);
        });
    }
    catch{
        res.status(500).send(err);
    }
   
});

router.get('/:id', (req, res) => {
    try{
        User.findById(req.params.id, (err, user) => {
            res.json(user);
         });
    }
    catch{
        res.status(500).send(err);
    }
     
});

router.put('/:id', (req, res) => {
    try{
        User.save(req.user);
        res.json(req.user);
    }
    catch{
        res.status(500).send(err);
    }

});

router.patch('/:id', (req, res) => {
    try{
        User.findById(req.params.id, (err, user) => {
            if(req.body.id){
                delete req.body.id;
            }
            for(let b in req.body){
                user[b] = req.body[b];
            }
            user.save();
            res.json(user);
        });
    }
    catch{
        res.status(500).send(err);
    }
 
});
//delete works, but the success response never comes
router.delete('/:id', (req, res) => {
    try{
        User.findByIdAndRemove(req.params.id, (err, user) => {
            res.send.status(200);
        });
    }
    catch{
        res.status(500).send(err);
    }
  
});

router.post('/addUser', (req, res) => {
    try{
        const newUser = new User();
        newUser.userName = req.body.userName;
        newUser.passWord = req.body.passWord;
        User.save(newUser);
        res.status(201).send(newUser);
    }
    catch{
        res.status(500).send();
    }
  
});

module.exports = router;