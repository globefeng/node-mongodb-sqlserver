var express = require('express')
var router = express.Router()
const authController = require("../controllers/authController/index");
const { validateToken } = require('../utils/auth');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/users', validateToken, authController.users);
router.post('/register', authController.register);
router.post('/signin', authController.signin);

module.exports = router
