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

app.get('/', (req, res) => {
});

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.post('/api/folders', (request, response) => {
	const { folderName} = request.body;
	const id = md5(folderName);

  app.locals.folders[id] = folderName;
  console.log(id, folderName);
  response.json({ id, folderName})
})

app.get('/api/folders/:id', (request, response) => {
  const {id} = request.params
  const folder = app.locals.folders[id]

  if(!folder){
    response.sendStatus(404);
  }
  response.json({id, folder})
})

app.post('/api/folders/:id', (request, response) => {
	const { url } = request.body;
	const urlId = md5(url);

	
});

app.listen(3000, () => {
  console.log('listening');
});

// $('.url-submit').click(function() {
// 	alert('i was clicked')
// })
