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


app.get('/test', function (req, res) {
    console.log("TEST ENDPOINT REACHED");
    res.send({test:"test"});
});

app.post('/summary', summarize);

function summarize(req, res)
{
    const data = req.body
    console.log(data)
    textapi.summarize({
        url: 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate',
        sentences_number: 3
        }, function(error, response) {
        if (error === null) {
            res.sentences.forEach(function(s) {
            console.log(s);
            });
        }
        });
}

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('listening on port 8000!')
})