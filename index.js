const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./src/routes/mongodbTestRouter');
const sqlTestRouter = require('./src/routes/sqlTestRouter');

const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/productsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} )

app.use(express.urlencoded());
app.use(express.json()); 

// routes(app);
app.use('/api/product', productRouter);
app.use('/api/sqltest', sqlTestRouter);

app.get('/', (req, res) =>
    res.send(`Store server running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);
