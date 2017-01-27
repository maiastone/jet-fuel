exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('urls', function(table) {
            table.increments('id').primary();
            table.string('url');
            table.string('shortURL');
            table.timestamps();
            table.integer('folder_id')
            .references('id')
            .inTable('folders');
        }),

        knex.schema.createTable('folders', function(table){
            table.string('id').primary();
            table.string('title');
            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('urls'),
        knex.schema.dropTable('folders')
    ])
};
