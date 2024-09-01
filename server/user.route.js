const express = require('express');
const userrouter = express.Router();
const usermodel = require('./user.model');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const bcrypt = require('bcrypt');
require('dotenv').config();
function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function checkPassword(dbPassword, newPassword) {
    return bcrypt.compareSync(newPassword, dbPassword);
}

userrouter.get('/list', auth, (req, res) => {
    usermodel.find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

userrouter.get('/list/:id', auth, (req, res) => {
    usermodel.findOne({ '_id': req.params.id })
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

userrouter.post('/signup', (req, res) => {
    const { email, password , firstname,lastname, phone } = req.body;
    const hashedPassword = hashPassword(password);
    let user = new usermodel({ email, password: hashedPassword, firstname, lastname, phone });
    user.save()
        .then((user) => {
            res.status(201).json({ message: 'User created successfully', user });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

userrouter.post('/signin', (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    usermodel.findOne({ email:email })
        .then((user) => {
            console.log(user,"user")
            if (user && checkPassword(user.password, password))  {
                const token = jwt.sign({ Id: user._id }, process.env.SECRET_KEY, { expiresIn: '1hr' });
                res.status(200).json({ message: 'Signin successful', token,user });
            } else {
                res.status(400).json({ error: 'Signin failed' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});
userrouter.put('/edit/:id', auth, (req, res) => {
    const updateData = req.body;
        if (updateData.password) {
            updateData.password = hashPassword(updateData.password);
        }
    usermodel.findByIdAndUpdate({'_id':req.params.id},updateData)
        .then(() => {
            res.status(200).json('data updated');
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});
userrouter.delete('/delete/:id', auth, (req, res) => {
    usermodel.findByIdAndDelete({'_id':req.params.id})
        .then(() => {
            res.status(200).json('data deleted');
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = userrouter;
console.log('User router is ready');
