global.__base = __dirname + '/';
require('dotenv').config();

let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let express = require('express');
let app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

require(__base + 'router.js')(app);

console.log('port = ' + process.env.PORT);
app.listen(process.env.PORT);
console.info('Listening on port ' + process.env.PORT);