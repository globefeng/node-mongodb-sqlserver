export const sqlConfig = {  
  server: 'nodetest.mssql.somee.com',
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
      database: 'nodetest'
  }
}; 
