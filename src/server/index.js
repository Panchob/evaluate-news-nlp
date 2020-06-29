var path = require('path')
var aylien = require("aylien_textapi");

const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
  
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/summary', summarize);

function summarize(req, res)
{
    let summary = []
    const data = req.body
    console.log(data)
    textapi.summarize({
        url: data.article,
        sentences_number: 3
        }, function(error, response) {
            if (error === null) {
                response.sentences.forEach(function(s) {
                    summary.push(s);

                });
                console.log(summary)
                res.send({'summary':summary})
            }
        });
}

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('listening on port 8000!')
})