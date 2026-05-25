const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, '/test'), {}, err => {
  if (err) throw err;
  console.log('folder created');
});

fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hi', err => {
  if (err) throw err;
  console.log('file created');
});

fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });

var myReadStream = fs.createReadStream(__dirname + '/input.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/output.txt');

myReadStream.pipe(myWriteStream); // Writes all the content from input.txt to output.txt using piping.
