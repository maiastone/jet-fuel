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

app.locals.folders = [
  {
    id: 1,
		title: 'folder one'
  },
  {
    id: 2,
		title: 'folder two'
  }
]

app.locals.urls = [
  {
    folderID: '1',
    url: 'www.google.com',
		shorturl: shortid.generate(),
    date: Date.now(),
    clickCount: 0
  }
]

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders)
});

app.post('/api/folders', (request, response) => {
  console.log(request.body);
  const { folder } = request.body
  const id = md5(folder)

  if (!folder) {
   return response.status(422).send({
     error: 'No folder provided'
   });
 }

  app.locals.folders.push({ title: folder, id: id})

  response.status(201).json({
      title: folder,
      id: id
   })
});

app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  const result = app.locals.urls.filter(function(url) { return url.folderID === id.toString() })

  if(!result) { return response.sendStatus(404); }

  response.json( result );
})

app.get('/api/urls', (request, response) => {
  response.json(app.locals.urls)
});


app.get('/api/folders/:folderID', (request, response) => {
  const { folderID } = request.params;

  app.locals.folders[folderID] = {
    folderID,
    url,
    date: Date.now(),
    clickCount: 0
  }
  response.json(app.locals.urls[urlId])
});


app.post('/api/urls', (request, response) => {
  const { url, folderID} = request.body;
  const id = md5(url);
  const shorturl = shortid.generate();

  if (!url) {
   return response.status(400).send({
     error: 'no url provided'
   });
  }

  app.locals.urls.push({
    id,
    folderID,
    url,
    shorturl
  });

  response.json({
    id,
    folderID,
    url,
    shorturl
  });

});


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
