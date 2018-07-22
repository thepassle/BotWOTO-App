const express = require('express');

const serveStatic = require('express-static-gzip');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieSession = require('cookie-session');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');

const routes = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: ['test']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/api', routes);

app.get('/auth/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});

app.use(history());
app.use(serveStatic(__dirname + '/dist/'));

app.listen(process.env.PORT || 8081, function () {
    console.log('Node app is running on port 8081');
});