global.__base = __dirname + '/';
require('dotenv').config();

let passport = require('passport');
let flash = require('connect-flash');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

let express = require('express');
let app = express();

app.set('views', __base + 'views/');
app.set('view engine', 'ejs');
app.use('/public', express.static(__base + 'public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'amalgamation'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require('./config/auth/passport')(passport);
require(__base + 'router.js')(app, passport);


console.log('port = ' + process.env.PORT);
app.listen(process.env.PORT);
console.info('Listening on port ' + process.env.PORT);