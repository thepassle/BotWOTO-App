const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const tmi = require('tmi.js');
const router = express.Router();
const dotenv = require("dotenv");
const { parsed } = dotenv.config();

const client = new tmi.client({
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: 'botwoto',
      password: process.env.TWITCH_OAUTH
    }
  });

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET    = process.env.TWITCH_SECRET;
const SESSION_SECRET   = process.env.SESSION_SECRET;
const CALLBACK_URL     = process.env.CALLBACK_URL;

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  const options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'OAuth ' + accessToken
    }
  };

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
// https://botwoto.herokuapp.com/auth/twitch/callback
// http://localhost:3000/auth/twitch/callback
passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: 'https://botwoto.herokuapp.com/auth/twitch/callback',
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    done(null, profile);
  }
));

router.get('/twitch', passport.authenticate('twitch', { scope: 'user_read' }), function(req, res){
});

router.get('/twitch/callback', passport.authenticate('twitch'), function(req, res){
    let isMod;
    const username = req.session.passport.user.display_name;
    client.connect().then(() => {
      client.mods('bradwoto').then(moderators => {
        moderators.push('bradwoto');
        if(moderators.includes(username.toLowerCase())){
          req.user.isMod = true;
          res.redirect('/');
        } else {
          req.user.isMod = false;
          res.redirect('/');
        }
      });
    });
});

module.exports = router;