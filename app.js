var express = require('express')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

});

app.post('/api/shorten', (req, res) => {

});

app.get('/:encoded_id', (req, res) => {

});

app.listen(3000, () => {
  console.log('listening');
});
