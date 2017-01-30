exports.seed = function(knex, Promise) {
    return knex('folders').del()
   .then(() => {
     return Promise.all([
       knex('folders').insert({
         folderID: 100,
         title: 'House',
         created_at: new Date,
         id: 1
       }),
       knex('folders').insert({
         folderID: 101,
         title: 'Fun',
         created_at: new Date,
         id: 2
       }),
       knex('folders').insert({
         folderID: 102,
         title: 'Kids',
         created_at: new Date,
         id: 3
       }),
       knex('folders').insert({
         folderID: 103,
         title: 'Work',
         created_at: new Date,
         id: 4,
       }),
       knex('folders').insert({
         folderID: 104,
         title: 'Design',
         created_at: new Date,
         id: 5
       })
      ]);
   })
}
