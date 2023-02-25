
const { Connection, Request } = require("tedious");
const { sqlConfig } = require("../index");

const sqlConnection = new Connection(sqlConfig);
const queryString = `SELECT [user].id, [user].name, [user].password FROM [users]`;

module.exports = function getAllUsers(req, res) {
  return new Promise((resolve, reject) => {
    sqlConnection.on('connect', function(err) {  
      if (err) {
        return reject(err);
      }

      const queryTask = new queryDatabase();
      queryTask.then(data => resolve(data));

    });
    sqlConnection.connect();  
  })
};

function queryDatabase() {
  return new Promise((resolve, reject) => {
    var result = [];
  
    const request = new Request(
      queryString,
      (err, rowCount) => {
        if (err) {
          reject(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
          console.log(JSON.stringify(result));
          resolve(result);
        }
      }
    )
    request.on('row', function(columns,idx) {
      var obj = {};
      columns.forEach( function(column) {
         var key = column.metadata.colName
         var val = column.value
         obj[key] = val
      });
      result.push(obj);
    })
  
    request.on('requestCompleted', function () {  
    }); 

    sqlConnection.execSql(request);
    }
  );
 
}


