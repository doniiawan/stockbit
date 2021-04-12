var mysqlconn = require('../database/mysql')

module.exports = {
  storeLogger: function (data) {
    let queryString =
      'INSERT INTO logger SET ?'
    const params = {
      method: data.method,
      path: data.path,
      parameters: JSON.stringify(data.parameters),
      status: data.status,
    }
    mysqlconn.query(queryString, params, function (error, results, fields) {
      if (error) console.log(error)
    })
  },

  getAllLogger: function () {
    mysqlconn.query('SELECT * FROM logger', function (error, results, fields) {
      if (error) console.log(error)
      var mysqlRes = results.map((mysqlObj, index) => {
        return Object.assign({}, mysqlObj)
      })
    })
  },
}
