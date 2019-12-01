// index.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors =  require('cors');

const security = require('./security/security.js')
const openRouter = require('./routers/openRouter'); // Imports public routes
const secureRouter = require('./routers/secureRouter'); // Imports secure routes
const mongoDB = 'mongodb+srv://abd36:test@cluster0-resu7.mongodb.net/test?retryWrites=true&w=majority';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({origin: '*'}))

app.use(passport.initialize());
app.use(passport.session());



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/open', openRouter);
app.use('/api/secure', passport.authenticate('jwt', { session: false }), secureRouter);

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;  
app.listen(port, () => console.log('Listening on port ' + port));