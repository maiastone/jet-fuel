exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        url: 'www.houzz.com',
        shortURL: 'short.com',
        folderID: 100,
        created_at: new Date
      }),
      knex('urls').insert({
        url: 'www.twitter.com',
        shortURL: 'short.com',
        folderID: 101,
        created_at: new Date
      }),
      knex('urls').insert({
        url: 'www.instagram.com',
        shortURL: 'short.com',
        folderID: 102,
        created_at: new Date
      }),
    ]);
  })
};
