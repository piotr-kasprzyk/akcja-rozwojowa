var express = require('express');
var bodyParser = require('body-parser');

var app = express();


var urlEncoded = (bodyParser.urlencoded({ extended: true }));

app.use(urlEncoded);


var video_count = 0;
var videos = [];


app.get('/', function (req, res) {
  res.sendFile((__dirname+'/index.1.html'));
})


app.get('/videos', function(req, res){
    var json = {totalRecords: video_count,
                videos: videos};
    res.json(json);
})



app.get('/dziewczynka/:imie', function(req, res){
    var lancuch = "";
    lancuch += "<h1>Strona www</h1>";
    lancuch += "<p style=\"color: red;background-color: pink;\">" + "Dzień dobry, " + req.params.imie + "!";
    res.send(lancuch);
})


app.post('/imie', function(req, res){

    let body = req.body;
    var lancuch = "";
    lancuch += "<p>" + "Cześć, " + body.imie + "!";
    res.send(lancuch);
})

app.post('/videos', function(req, res){

    let body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        body = JSON.parse(body);

        var video = {id: video_count++,
            user: body.user,
            title: body.title,
            description: body.description
            };
         videos.push(video);

        res.sendStatus(201);
    }); 

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})