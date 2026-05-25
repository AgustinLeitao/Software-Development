const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();
const port = 3000;

/* Use Middleware */

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// //Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Set template engine
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// Use logger middleware
app.use(logger);

app.get('/', (req, resp) => {
    resp.render('index', {
        members
    });
});

// Includer members routing
app.use('/api/members', require('./routes/api/members'));

app.listen(port, () => console.log(`Server started on port ${port}`));