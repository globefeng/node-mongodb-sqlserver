
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { 
      type: String,
    },
    password: { 
      type: String,
    },
    created_date : {
      type: Date,
      default: Date.now
    },
    expired_date : {
      type: Date,
      default: null
    }
  }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = class authController { 
  static users(req, res) {
    UserModel.find({}, (err, users) => {
      if (!err) {
        var useList = users.map(({username, expired_date}) => ({username, expired_date}));
        return res.status(200).json(useList);
      } 
      return res.status(500).send(err);
    });
  }

  static register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json('invalid data');
    }

    let date = new Date();
    date.setMonth(date.getMonth() + 3);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let userModel = new UserModel({
      username: username,
      password: hash,
      expired_date: date,
    });

    userModel.save((err, User) => {
      if (err) {
        res.send(err);
      }
      res.json(User);
    })
  }

  static signin(req, res) {
    const {username, password } = req.body;
    if (!username || !password) {
      return res.status(500).json('Invalid input data');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    UserModel.findOne({username}, (err, user) => {
      if (!err) {
        bcrypt.compare(password, user.password).then(match => {
          if (match) {
            return res.status(200).json('You are signed in');
          }
          return res.status(500).json('Fail to sign in 111');
        }).catch(err => {
          return res.status(500).json('Fail to sign in 222');
        });
      } else {
        return res.status(500).json('Fail to sign in 333');
      } 
    })
  }

 };