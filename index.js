require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const dns = require('dns')

// Basic Configuration
const port = process.env.PORT || 3000

const shortUrlArray = []

console.log('**** Hello URL Shortener! ****')

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

/* BODY PARSER */
app.use('/', bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// handle GET requests to /api/shorturl/:shorturl
app.get('/api/shorturl/:shorturl', function (req, res) {
  const index = req.params.shorturl
  console.log({ Shorturl_index: index})

  // use 'index' to find original url in map
  const redirectUrl = shortUrlArray[index]
  // redirect to original url
  console.log({ redirecting_to: redirectUrl })
  res.redirect(redirectUrl)
})

// POST to /api/shorturl
app.post('/api/shorturl', function (req, res) {
  let parsedUrl = ''
  const originalUrl = req.body.url
  // See if URL is parsable
  if (URL.canParse(originalUrl)) {
    // If it can be parsed,
    // - parse it
    parsedUrl = new URL(originalUrl)

    // then check if it is a valid url
    dns.lookup(parsedUrl.hostname, (error, address, family) => {
      if (error) {
        	// if it breaks
        	console.log({ error: 'invalid url' })
        	res.json({ error: 'invalid url' })
      } else {
        	// proceed with adding the url to an array
        shortUrlArray.push(originalUrl)
        console.log('Array length: ', shortUrlArray.length)

        console.log({ original_url: req.body.url, short_url: 1 })
        res.json({ original_url: req.body.url, short_url: 1 })
      }
    })
  }

  // send back the JSON
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
