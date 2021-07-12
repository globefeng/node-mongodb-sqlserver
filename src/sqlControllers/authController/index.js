const getAllUsers = require('./getAllUser.js');

module.exports = class authController { 
  static apiGetAllUsers(req, res) {
    getAllUsers(req, res)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));    
  }
 };