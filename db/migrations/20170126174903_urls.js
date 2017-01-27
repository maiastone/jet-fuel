exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table){
            table.increments('folderID').primary();
            table.string('title');
        }),

        knex.schema.createTable('urls', function(table) {
          table.string('id').primary().unique();
          table.string('url');
          table.string('shortURL');
          table.timestamps();
          table.integer('folder_folderID')
          .references('folderID')
          .inTable('folders');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('urls'),
        knex.schema.dropTable('folders')
    ])
};
