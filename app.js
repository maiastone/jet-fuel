const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');
const moment = require('moment');
const shortid = require('shortid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Jet Fuel'
app.locals.folders = []
app.locals.urls = []

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders)
})

app.get('/api/urls', (request, response) => {
  response.json(app.locals.urls)
})

app.post('/api/folders', (request, response) => {

  const { folder } = request.body
  const id = md5(folder)

  if (!folder) {
   return response.status(422).send({
     error: 'No folder provided'
   });
 }

  app.locals.folders.push({ folder_title: folder, id: id})

  response.status(201).json({
      folder_title: folder,
      id: id
   })
});

app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  const folder = app.locals.folders.filter(function(folder) { return fol.id === id })

  if(!folder) { return response.sendStatus(404); }

  response.json({ folder })
})

app.post('/api/urls', (request, response) => {
  const { url, folderId } = request.body
  const id = md5(url)
  const short = 'http://' + shortid.generate()
  const created = moment()

  if (!url) {
    return response.status(422).send({
      error: 'No url provided'
    });
  }

  app.locals.urls.push({
    id: id,
    folder_id: folderId,
    short_url: short,
    original_url: url,
    created_at: created,
  })

  response.status(201).json({
    id: id,
    folder_id: folderId,
    short_url: short,
    original_url: url,
    created_at: created,
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry, trouble finding that!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
