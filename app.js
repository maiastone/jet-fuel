const express = require('express');
const bodyParser = require('body-parser');
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

app.get('/', (request, response) => {
});

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.post('/api/folders', (request, response) => {
	const { folderName } = request.body;
	const folderID = md5(folderName);

  app.locals.folders[folderID] = folderName;
  console.log(folderID, folderName);
  response.json({ folderID, folderName})
});

app.get('/api/folders/:id', (request, response) => {
  const {id} = request.params;
	var result = app.locals.folders.filter(function(folder) {
		return folder.id === parseInt(id)
	})
	console.log(app.locals.folders)
  if(!result){
    response.sendStatus(404);
  }
  response.json(result)
});

app.post('/api/folders/:folderID', (request, response) => {
	const {folderID} = request.params;
	const { url } = request.body;
	const urlId = md5(url);

	app.locals.urls[urlId] = {
		folderID,
		url,
		shorturl: urlId,
		date: Date.now(),
		clickCount: 0
	}
	response.json(app.locals.urls)
});

app.get('/api/folders/:folderid/:shorturl', (request, response) => {
  const {folderid, shorturl} = request.params
  const url = app.locals.urls[shorturl]

  response.json(url)
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
  const { folderID } = request.params;
  const { url, shorturl } = request.body;
  const id = md5(url);

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
