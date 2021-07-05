var express = require('express')
var router = express.Router()
var Product = require('../mongoDbModels/productModel');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.post('/', (req, res) => {
  let newProduct = new Product(req.body);

  // res.send(req.body);
  newProduct.save((err, Product) => {
    if (err) {
      res.send(err);
    }
    res.json(Product);
  })
})

router.get('/', function (req, res) {
  const query = {};
  if (req.query.description) {
    query.description = req.query.description;
  }
  Product.find(query, (err, products) => {
    if (err) return res.send(err);
    return res.json(products);
  })
})

router.get('/:productId', function (req, res) {
  Product.findById(req.params.productId, (err, product) => {
    if (err) return res.send(err);
    return res.json(product);
  })
})


// define the about route
router.get('/about', function (req, res) {
  res.send('About product')
})

module.exports = router