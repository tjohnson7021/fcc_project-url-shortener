require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns')

// Basic Configuration
const port = process.env.PORT || 3000;

let shortUrlMap = []

console.log('**** Hello URL Shortener! ****')

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

/* BODY PARSER */
app.use('/', bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//POST to /api/shorturl
app.post('/api/shorturl', function(req, res) {
	console.log({ original_url : req.body.url, short_url : 1})

	//See if URL is parsable


	//send back the JSON
  res.json({ original_url : req.body.url, short_url : 1});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

