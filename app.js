const http = require('http');

function rqHandler(req, res) {
    console.log(req);
};

const server = http.createServer(rqHandler);

server.listen(3000);


