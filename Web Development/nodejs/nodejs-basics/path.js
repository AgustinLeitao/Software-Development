const path = require('path');

console.log(path.basename(__filename)); // it gives the name of the file.
console.log(path.dirname(__filename)); // it gives the name of the directory.
console.log(path.extname(__filename)); // it gives the name of the file extension.
console.log(path.parse(__filename).base); // it gives the name of the file.
console.log(path.parse(__filename).dir);  // it gives the name of the directory.
console.log(path.parse(__filename).ext); // it gives the name of the file extension.
console.log(path.join(__filename, 'test', 'hi.html')); // it gives the name of the file extension.