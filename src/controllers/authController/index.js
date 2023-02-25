
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { options, secret } = require('../../utils/authConst');


module.exports = class authController { 
  static users(req, res) {
    UserModel.find({}, (err, users) => {
      if (!err) {
        const { role } = req.decoded;
        if (role && role === 'admin') {
          var useList = users.map(({username, expired_date}) => ({username, expired_date}));
          return res.status(200).json(useList);  
        }
        else {
          return res.status(401).json('No authority to access the data')
        }
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
      role: 'user',
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

    UserModel.findOne({username}, (err, user) => {
      if (!err) {
        bcrypt.compare(password, user.password).then(match => {
          if (match) {
            const payload = { user: username, role: user.role };
            const token = jwt.sign(payload, secret, options);
            return res.status(200).json(token);
          }
          return res.status(500).json('Authentication error');
        }).catch(err => {
          return res.status(500).json('Authentication error');
        });
      } else {
        return res.status(500).json('Authentication error');
      } 
    })
  }

 };