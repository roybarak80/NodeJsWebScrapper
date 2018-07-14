var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var url = 'https://www.pardes-hanna-karkur.muni.il/';
var linksArrRes = [];

app.get('/',function (req, res,next) {

    request('http://localhost:8081/webscrap', function(error, response, body){})

    setTimeout(function(){
        var linksArrResStr = JSON.stringify(linksArrRes)
        res.send(linksArrResStr);
    },5000)

});

app.get('/webscrap', function (req, res,next) {

request(url, function(error, response, body){

  if(!error && response.statusCode == 200){ 
        $ = cheerio.load(body);
      links = $('a'); // extract all hyperlinks
  
  $(links).each(function(i, link){ 
    var linkRecieved = $(link).attr('href');

    if (linkRecieved.indexOf('www') > -1){
    
      request(linkRecieved, function(error, response, body){ // check for response
        if(!error && response.statusCode == 200){
         // console.log(linkRecieved)
          setlinkArr(linkRecieved)
          
        } else {
          console.log('false')
        }
      });
      
    }
    
  });
  

  }
  
});

})

function setlinkArr (prm){
    linksArrRes.push(prm)
}
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log( port)
})