const { Knex } = require("knex");

exports.up = function(knex) {
    return knex.schema.createTable('table_temperatura' , (table) => {
        table.increments('id').primary(),
        table.string('cidade' , 20).notNullable(),
        table.string('pais' , 20).notNullable(),
        table.float('temperatura' , 10 , 2).notNullable(),
        table.integer('umidade').notNullable(),
        table.string('clima').notNullable(),
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('table_temperatura');
  
};
