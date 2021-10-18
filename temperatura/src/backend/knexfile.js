/*
  Insira as informações da base de dados como database, user e password.
*/
module.exports = {

  client: 'postgresql',
  connection: {
    database: '',
    user:     '',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
 
};
