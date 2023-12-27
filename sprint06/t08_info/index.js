const http = require('http');
var url = require('url');

var path = require('path');
var scriptName = path.basename(__filename);

var os = require('os');

function getServerIp() {

    var ifaces = os.networkInterfaces();
    var values = Object.keys(ifaces).map(function(name) {
      return ifaces[name];
    });
    values = [].concat.apply([], values).filter(function(val){
      return val.family == 'IPv4' && val.internal == false;
    });
  
    return values.length ? values[0].address : '0.0.0.0';
}

function getProtocol (req) {
    var proto = req.connection.encrypted ? 'https' : 'http';

    proto = req.headers['x-forwarded-proto'] || proto;
    return proto.split(/\s*,\s*/)[0];
}

var _host = os.hostname();

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) =>{
    console.log(scriptName);

    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
      });

    console.log(getServerIp());

    console.log(_host);

    console.log(getProtocol(req));

    console.log(req.headers);

    console.log(req.headers["user-agent"]);

    console.log(req.socket.remoteAddress);

    console.log(req.url.slice(1));
});

server.listen(port, host, () => {
    console.log(`Server is running`);
});
