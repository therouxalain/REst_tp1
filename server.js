const express = require('express')
const path = require("path")
const fs = require('fs')
const request = require('request')
const app = express()
const { PORT } = require('./config.js')
const { API_KEY } = require('./config.js')

    const url = 'https://content.guardianapis.com/search?q=12%20years%20a%20slave&format=json&tag=film/film,tone/reviews&from-date=2010-01-01&show-tags=contributor&show-fields=starRating,headline,thumbnail,short-url&order-by=relevance&api-key='+API_KEY

    request.get({
        url: url,
        json: true
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err)
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode)
        } else {
          // data is successfully parsed as a JSON object:
          var newData = JSON.stringify(data);
          fs.writeFile(__dirname+'/frontend/static/js/data/guardian.json', newData, err => {
            if(err) throw err;
            console.log('Success2!')
          })
        }
    })
 
app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})

app.listen(8081, ()=> console.log("server is running, yeah..."))
