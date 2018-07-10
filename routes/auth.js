const express        = require('express');
const session        = require('express-session');
const passport       = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request        = require('request');
const tmi = require('tmi.js');
const router = express.Router();

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  const options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': 'dnnrm974wmv5lywdxzkc7ckepzbrfs',
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

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
    clientID: 'dnnrm974wmv5lywdxzkc7ckepzbrfs',
    clientSecret: 'ei8g3dmvn8t5n1ffpj49xy0rshr6am',
    callbackURL: 'http://localhost:3000/auth/twitch/callback',
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    done(null, profile);
  }
));

router.get('/twitch', passport.authenticate('twitch', { scope: 'user_read' }), function(req, res){
  console.log("72:");
});

router.get('/twitch/callback', passport.authenticate('twitch'), function(req, res){
  console.log("84:");
  req.user.test = "test";
  req.user.isMod = true;
  console.log(req.user);
  res.redirect('/');
});

module.exports = router;