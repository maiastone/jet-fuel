exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        title: 'Folder 1',
        created_at: new Date
      }),
      knex('folders').insert({
        title: 'Folder 2',
        created_at: new Date
      })
    ]);
  })
}
