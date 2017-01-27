exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        title: 'Folder 1',
      }),
      knex('folders').insert({
        title: 'Folder 2',
      }),
      knex('folders').insert({
        title: 'Folder 3',
      })
    ]);
  })
}
