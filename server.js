const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  res.end();
  });
}).listen(8000);

// I think the query selectors will go in the frontend (script.js), while we could do the coinflip on server.js.
// Then we would need to fetch from script.js to get the coinflip result.
// We could generate a new coinflip on each new req