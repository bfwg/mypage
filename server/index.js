'use strict';

const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const graphQLHTTP = require('express-graphql');
const querySchema = require('./schema/schema').schema;
const API = require('./api');

const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
//mercy due to issue https://github.com/graphql/express-graphql/issues/40
var USERNAME = null;

app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 600000 },
  resave: true,
  saveUninitialized: false,
}));

app.listen(PORT, () => {
  console.log('node ' + process.version + ' listen on port ' + PORT + '(' + process.env.NODE_ENV + ')');
});

// app.use(function(req, res, next) {
   // // no: set a new cookie
  // var randomNumber=Math.random().toString();
  // randomNumber=randomNumber.substring(2,randomNumber.length);
  // new Promise(resss => {
    // setTimeout(() => {
      // resss('s');
    // }, 50);
  // })
  // .then(ress => {
      // // res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
  // // console.log('cookie created successfully');
      // next();
    // });
// });





app.use(API);


app.use((req, res, next) => {
  USERNAME = req.session.username || USERNAME;
  if (USERNAME)
    req.username = USERNAME;
  next();
});


app.use('/graphql', graphQLHTTP(request => {
  return ({
      schema: querySchema,
      rootValue: { session: request.username },
      graphiql: true,
      pretty: true,
  });
}));



app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// (new MyImages()).add('abc.jpeg')
// .then(res => {
  // console.log(res);
// });
//


