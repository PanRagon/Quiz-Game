
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const matchApi = require('./routes/match-api');
const authApi = require("./routes/auth-api");
const Users = require("./db/users");


const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

app.use(session({
    secret: "a secret used to encrypt the session cookies",
    resave: false,
    saveUnitialized: false
}));

//Serve static files
app.use(express.static("public"));

passport.use(new LocalStrategy(
    {
        usernameField: "id",
        passwordField: "password"
    },
    function (id, password, done) {

        const ok = Users.verifyUser(id, password);

        if(!ok) {
            return done(null, false, {message: "Invalid username or password"})
        }

        const user = Users.getUser(id);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {{
    done(null, user.id);
}});

passport.deserializeUser(function (id, done) {
    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());

//Use /api for all API routes
app.use('/api', matchApi);
app.use('/api', authApi);

app.use(express.static('public'));

//Handle 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});


module.exports = app;