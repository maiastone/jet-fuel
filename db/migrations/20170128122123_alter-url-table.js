exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('urls', function(table){
    table.renameColumn('folder_folderID', 'folderID')
  })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table){
    table.renameColumn('folderID', 'folder_folderID')
    })
  ])
};
