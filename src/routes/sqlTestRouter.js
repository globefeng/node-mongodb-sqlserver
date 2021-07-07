var express = require('express')
var router = express.Router()
const { Connection, Request } = require("tedious");

var config = {  
    server: 'stockApiDatabase.mssql.somee.com',
    authentication: {
        type: 'default',
        options: {
            userName: 'itcwangfeng_SQLLogin_1',
            password: 'p1v5smrip1'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: 'stockApiDatabase'
    }
}; 

var connection = new Connection(config);  

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/**
 * @swagger
 * /api/product:
 *   get:
 *     description: This should return all products
 *   responses:
 *     200:
 *       description: products
 *       schema:
 *         type: object
 *         properties: 
 *           _id: 
 *             type: string
 *           name:
 *             type: string
 *   
 */
router.get('/', function (req, res) {
  connection.on('connect', function(err) {  
    if (err) {
     return res.send(err);
    }
    queryDatabase((data) => {
      return res.json(data);
    });
  });
  connection.connect();     
})

function queryDatabase(callback) {
  console.log("Reading rows from the Table...");

  var result = [];  
  const request = new Request(
    `SELECT * FROM Sectors`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
        callback(result);
      }
    }
  );
 
  request.on('row', function(columns,idx) {
    columns.forEach( function(column) {
      if(column.value !== null && column.metadata.colName === 'Name'){
       var key = column.metadata.colName
       var val = column.value
      //   obj[key] = val
        console.log(`${key} - ${val}`)
        result.push(column.value);
      }
    });
  })

  connection.execSql(request);
}

module.exports = router
