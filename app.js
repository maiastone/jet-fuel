const bodyParser = require('body-parser');
const express = require('express');
const shortid = require('shortid');
const path = require('path');
const md5 = require('md5');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.envPORT || 3000);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/urls', (request, response) => {
  database('urls').select()
  .then(function(secrets) {
    response.status(200).json(secrets);
  })
  .catch(function(error) {
    console.error('error fetching urls')
  });
})

app.post('/api/urls', (request, response) => {
  const { url, folderID } = request.body;
  const shortURL = shortid.generate();
  database('urls').insert({ url, shortURL, folderID })
  .then(function(url) {
    database('urls').select()
  .then(function(url) {
    response.status(200).json(url);
  })
  .catch(function(error) {
    console.error('error posting urls')
  });
  })
})

app.get('/api/folders', (request, response) => {
  database('folders').select()
  .then((folders) => {
    response.status(200).json(folders)
  })
  .catch(function(error){
    console.error('error fetching folders')
  });
});

app.post('/api/folders', (request, response) => {
  const { title } = request.body
  if (!request.body) {
   return response.status(400).send({
     error: 'No folder provided'
   });
 }

  database('folders').insert({title})
    .then(function(folder) {
     database('folders').select()
     .then(function(folder) {
       response.status(200).json(folder);
     })
     .catch(function(error) {
       console.error('database error')
     })
    })
});

app.get('/api/folders/:folderID', (request, response) => {
  const { folderID } = request.params
  database('folders').select().table('urls').where('folderID', folderID)
    .then(function(urls) {
      response.status(200).json(urls);
    })
    .catch(function(error) {
      console.error(error)
    })
})

app.listen(3000, () => {
  console.log('listening');
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry, trouble finding that!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
