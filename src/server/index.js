var path = require('path');
var aylien = require("aylien_textapi");

const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

console.log(__dirname)


// set aylien API credentiaLs
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
  
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.post('/summary', function summarize(req, res){
    const article = req.body.article
    summary = []

    textapi.summarize({
        url: article,
        sentences_number: 3
        }, function(error, response) {
            if (error === null) {
                response.sentences.forEach(function(s) {
                    summary.push(s);
                });
                res.send({'summary':summary});
            }
            else {
                res.send(error)
            }
        });
});

app.post('/extract', function extract(req, res){
    const article = req.body.article

    textapi.extract({
        url: article,
    }, function(error, response) {
        if (error === null) {
            res.send({'title':response.title})
        }
        else {
            res.send(error)
        }
    });
});
    

app.post('/sentiment', function sentiment(req, res){
    const article = req.body.article

    textapi.sentiment({
        url: article,
        mode: 'document'
      }, function(error, response) {
        if (error === null) {
            res.send({'polarity':response.polarity})
        }
        else {
            res.send(error)
        }
    });
});

app.post('/concepts', function concepts(req, res){
    const article = req.body.article
    mainConcepts = []

    textapi.concepts({
        url: article
      }, function(error, response) {
        if (error === null) {
          Object.keys(response.concepts).forEach(function(concept) {
            var surfaceForms = response.concepts[concept].surfaceForms.map(function(sf) {
              return sf['string'];
            });
            mainConcepts.push(surfaceForms.join(","));
          });
          res.send({'concepts':mainConcepts})
        }else {
            res.send(error)
        }
        
      });
});

// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});