import passport from 'passport';
import User from '../models/User';
import config from './database';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local'


// use email instead of username
const localOptions = { usernameField: 'email'};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
    User.findOne({ email: email }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

        return done(null, user);
        });
    });
});

const jwtOptions = {  
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new Strategy(jwtOptions, function(payload, done) {  
    User.findById(payload._id, function(err, user) {
        if (err) { return done(err, false); }
    
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);

export default passport;