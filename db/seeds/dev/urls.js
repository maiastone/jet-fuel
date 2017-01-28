exports.seed = function(knex, Promise) {
  return knex('urls').del()
   .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 1,
        url: 'http://www.houzz.com/',
        shortURL: 'jet.ly/783ERr',
        created_at: new Date,
        folderID: 104
      }),
      knex('urls').insert({
        id: 2,
        url: 'https://twitter.com/',
        shortURL: 'jet.ly/103DHa',
        created_at: new Date,
        folderID: 103
      }),
      knex('urls').insert({
        id: 3,
        url: 'https://www.denverlibrary.org/',
        shortURL: 'jet.ly/198KUw',
        created_at: new Date,
        folderID: 102
      })
    ]);
  })
}
