const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_KEY, // Your Google OAuth client ID
            clientSecret: process.env.GOOGLE_SECRET_KEY, // Your Google OAuth client secret
            callbackURL: `${process.env.BASE_URL}/auth/google/callback`, // Backend callback URL
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                // Check if the user already exists in the database
                let user = await User.findOne({
                    email: profile.emails[0].value,
                    googleId: profile.id,
                });

                if (!user) {
                    // If user does not exist, create a new user
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        imagePath: profile.photos[0].value,
                    });
                    await user.save();
                }

                // Return the user data after successful authentication
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
    try {
        // const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
