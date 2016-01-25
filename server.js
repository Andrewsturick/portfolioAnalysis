'use strict'

var express       = require('express')
var app           = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendfile('index.html')
})

app.all("/*", (req, res) => {
  res.redirect('/')
})

app.listen(process.env.PORT || 3007)
console.log('listening on 3007')
