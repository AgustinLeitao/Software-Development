const fs = require('fs');

const requestHandler = (req, res) => {
  if (req.url === '/message' && req.method === 'POST') {
    const body = []; // To store the body of the request from client.

    // It gets data from the body and parses it into parsedBody array.
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1]; // Field value
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  } else {
    // Response to the client with some html.
    res.setHeader('Content-Type', 'text/html'); // res.setHeader('Content-Type', 'application/json');
    res.write('<html>');
    res.write(
      '<head><title>Sample</title><link rel="icon" href="data:,"></link></head>'
    );
    res.write(
      '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
    );
    res.write('</html>');
    res.end(); // res.end(JSON.stringify(myObj));
  }
}

module.exports = requestHandler; // module.exports.handler = requestHandler; exports.handler = requestHandler; Shortcut.