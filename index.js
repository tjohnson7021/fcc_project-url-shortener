require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

/* SIMPLE LOGGER */
app.use("/", express.static(__dirname + "/"),
    function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
    }
)

/* BODY PARSER */
app.use("/", bodyParser.urlencoded({extended: false}))


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Your first API endpoint
app.use('/api/shorturl', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
