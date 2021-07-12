export const sqlConfig = {  
  server: 'stockNode.mssql.somee.com',
  authentication: {
      type: 'default',
      options: {
          userName: 'globefeng_SQLLogin_1',
          password: '9jsuzjte3o'
      }
  },
  options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: false,
      database: 'stockNode'
  }
}; 
