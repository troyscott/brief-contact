var express = require('express');
var app =  express();

app.use(express.static(__dirname + '/public'));

app.get('/contacts', function(req, res) {  
   var data =  { contacts: [
     {id: 1, first: 'John', last:  'Doe', phone: ''},
     {id: 2, first: 'Mary', last:  'Jane', phone: ''}
   ] };
  res.send(data);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("listening on " + port);
});