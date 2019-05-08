const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AccessToken = require('../models/OAuthAccessToken');
const async = require('async');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}, function (jwt_payload, done) {
    if (jwt_payload.sub.userId) {
        User.findOne({ _id: jwt_payload.sub.userId }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user && user.status !== 'blocked') {
                return done(null, user);

            } else {
                return done(null, false);
            }
        });
    } else {
        return done(null, false);
    }
}));

exports.authenticate = (req, callback) => {
    delete req.body.status
    User.updateOneData({ email: req.body.email }, req.body, (err, user) => {
        if (err) {
            callback(err, null)
        } else {
            if (!user) {
                User.createData(req.body, (err, data) => {
                    if (err || !data) {
                        if (err) return callback(err, false);
                    } else {
                        asyncTask(data, (err, token) => {
                            callback(err, token)
                        })
                    }
                })
            } else {
                asyncTask(user, (err, token) => {
                    callback(err, token)
                })
            }
        }
    })
}

asyncTask = (user, callback) => {
    async.auto({
        getAccessToken: (cb) => {
            generateAccessToken(user, cb)
        }
    }, (err, res) => {
        return callback(err, res.getAccessToken)
    })
}

generateAccessToken = (user, cb) => {
    AccessToken.getOneData({
        user: user._id
    }, (err, token) => {
        if (err || !token) {
            AccessToken.createData({
                access_token: signToken(
                    { userId: user._id }),
                user: user._id
            }, (err, token) => {
                if (err) {
                    return cb(err, null);
                }
                return cb(null, token);
            })
        } else {
            return cb(err, token)
        }
    })
}

signToken = user => {
    return jwt.sign({
        iss: 'issuer',
        sub: user
    }, 'secret');
};

exports.isAdmin = () => {
    return (req, res, next) => {
        console.log("isAdmin: " + req.user)
        if (req.user.status === 'admin') {
            next();
        } else {
            res.status(401).send({
                message: "YOU ARE NOT ADMIN"
            })
        }
    }
}


exports.isAuthenticated = passport.authenticate('jwt', { session: false, scope: ['email'] });