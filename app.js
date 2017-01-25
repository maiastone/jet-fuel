var express = require('express');
var jsdom = require("jsdom");
var $ = require("jquery");
var bodyParser = require('body-parser');
const app = express();
const path = require('path');
const md5 = require('md5')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.envPORT || 3000);

let folders = [
]

app.locals.folders = {
  0: 'folder one',
  1: 'folder two'
};

app.locals.urls = {
  0:{
    folderid: "1",
    url: 'www.google.com',
		shorturl: 0,
    date: Date.now(),
    clickCount: 0
  }
}

app.get('/', (req, res) => {
});

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.post('/api/folders', (request, response) => {
	const { folderName} = request.body;
	const folderID = md5(folderName);

  app.locals.folders[folderID] = folderName;
  console.log(folderID, folderName);
  response.json({ folderID, folderName})
})

app.get('/api/folders/:folderID', (request, response) => {
  const {folderID} = request.params
  const folder = app.locals.folders[folderID]

  if(!folder){
    response.sendStatus(404);
  }
  response.json({folderID, folder})
})

app.post('/api/folders/:folderID', (request, response) => {
	const {folderID} = request.params
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

app.listen(3000, () => {
  console.log('listening');
});

// $('.url-submit').click(function() {
// 	alert('i was clicked')
// })
