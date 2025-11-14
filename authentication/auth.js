const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/Person');

// Configure LocalStrategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username', // field name from your form or body
            passwordField: 'password'  // field name from your form or body
        },
        async (username, password, done) => {
            try {
                console.log("Received credentials:", username, password);

                // Find user by username
                const user = await Person.findOne({ username });
                if (!user) {
                    console.log("No user found with username:", username);
                    return done(null, false, { message: 'Incorrect username' });
                }

                // Compare password using schema method
                const isPasswordMatch = await user.comparePassword(password);
                if (!isPasswordMatch) {
                    console.log("Incorrect password");
                    return done(null, false, { message: 'Incorrect password' });
                }

                console.log("Authentication successful");
                return done(null, user); // success
            } catch (error) {
                console.error("Error in Passport authentication:", error);
                return done(error);
            }
        }
    )
);

// Serialize and Deserialize user (for sessions)
passport.serializeUser((user, done) => {
    done(null, user.id); // stores user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Person.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
