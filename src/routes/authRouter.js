var express = require('express')
var router = express.Router()
const authController = require("../sqlControllers/authController/index");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', authController.apiGetAllUsers)

module.exports = router
