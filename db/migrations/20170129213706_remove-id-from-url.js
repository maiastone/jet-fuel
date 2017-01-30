exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('urls', function(table){
    table.dropColumn('id')
  })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table){
    table.integer('id')
    })
  ])
};
