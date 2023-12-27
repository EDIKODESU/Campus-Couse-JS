var express = require('express');
var xml2js = require('xml2js');
var app = express();
const {ListAvengerQuotes} = require('./ListAvengerQuotes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

port = 3000;

const data = [
  {id:1, name: 'Spider-man', quote: 'PSHSH-PSHSH', photo: ['1.jpg', '2.jpg'], date: '05-04-2022', comments: {quote: 'PSHSH-PSHSH', comment: "PAUK"}},
  {id:2, name: 'Spider-man', quote: 'PSHSH-PSHSH', photo: ['1.jpg', '2.jpg'], date: '05-04-2022', comments: {quote: 'PSHSH-PSHSH', comment: "PAUK"}},
  {id:3, name: 'Spider-man', quote: 'PSHSH-PSHSH', photo: ['1.jpg', '2.jpg'], date: '05-04-2022', comments: {quote: 'PSHSH-PSHSH', comment: "PAUK"}},
  {id:4, name: 'Spider-man', quote: 'PSHSH-PSHSH', photo: ['1.jpg', '2.jpg'], date: '05-04-2022', comments: {quote: 'PSHSH-PSHSH', comment: "PAUK"}},
];


app.get('/', function (req, res) {
  res.sendFile((__dirname + '/page.html'));
});

app.get('/XML', function(request, response){
  let list;
  list = new ListAvengerQuotes(data);
  list.toXML('./avenger_quote.xml');
  response.json({to: JSON.stringify(list.data), from: list.fromXML('avenger_quote.xml')});
});

app.listen(port, function() {
  console.log('Server started');
});

app.set('views', __dirname+'/');

