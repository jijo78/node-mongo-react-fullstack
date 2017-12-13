const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const requestIp   = require('request-ip');
const router      = express.Router(); //make an instance of the route
const config      = require('./config'); // get our config file
const UserAllowed = require('./src/server/models/user'); // get our mongoose user model
const Attempts    = require('./src/server/models/authAttempts'); // get our mongoose login attempts model

//PORT and DATABASE configuration
const port = process.env.PORT || 5000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

//check for any database error.
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
app.use(morgan('dev'));

/**
* API ROUTES  /
*
*/
router.get('/', function(req, res) {
  res.send('Hello World');
});

/**
 * API ROUTES  /save
 * save allowes users to databases
 *
 */
router.post('/save', function(req, res) {
    var users = new UserAllowed();
    // save the sample users
    // in production we would never save or use a password as plain text,
    // we would use some sort of encryption.
    users.users.push(
      {'name':'admin', 'password':'password'},
      {'name':'developer', 'password':'password'},
      {'name':'tester', 'password':'password'},
      {'name':'manager', 'password':'password'},
      {'name':'user', 'password':'password'}
    )
    users.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.send(users);
    });
});

/**
 * API ROUTES  /login
 * check if a person is allowed to login.
 *
 */
router.post('/login', function(req, res,done) {
  const attempts = new Attempts();

  UserAllowed.findOne({name : req.params.name, password: req.params.password}).exec(function(err, result){

    //if error from the database return.
    if (err) { return done(err); }
    let action;

    result.users.map(function( user,index ){
      if(req.body.name === user.name && req.body.password === user.password ){
          action ='AUTH_SUCCESS';
          if( req.body.password.toUpperCase()){
            return;
          }
        res.status(200).end();
        }else if(req.body.name !== user.name && req.body.password !== user.password){
            action ='AUTH_FAILURE';
          res.status(401).end();
        }
    })
  res.end();
  attempts.action = action || '';
});

//although req.connection.remoteAddress would return the ip address,
//requestIp is more safe as does multiple checks to determine the IP.
//https://www.npmjs.com/package/request-ip
attempts.ip = requestIp.getClientIp(req) || '';
attempts.date = (new Date().getTime());
attempts.username = req.body.name || '';

//save attempts to database.
attempts.save(function(err) {
    if (err) throw err;
    console.log(attempts);
  });
});

app.use('/api',router);

//connect the back to the front
app.use(express.static('./public/'));
app.use(express.static('./client/dist/'));
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')));

/**
 * Start server
 */
app.listen(port);
console.log('Listening on:' + port);
module.exports = app;
