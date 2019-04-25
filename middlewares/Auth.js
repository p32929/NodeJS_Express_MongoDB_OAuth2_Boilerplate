const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AccessToken = require('../models/OAuthAccessToken');
const async = require('async');
const scopes = require('../utils/scopes');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}, function (jwt_payload, done) {
    if (jwt_payload.sub.userId) {
        User.findOne({_id: jwt_payload.sub.userId}, function (err, user) {
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
    User.getOneData({email: req.body.email}, (err, user) => {
        if (err) {
            callback(err, null)
        } else {
            if (!user) {
                delete req.body.status
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
                    {userId: user._id}),
                user: user._id,
                scope: user.status === 'admin' ? scopes.superUser : scopes.normalUser,
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

exports.scopeCheck = function (scopes) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'].split(' ');
        if (authHeader && authHeader.length > 1) {
            const accessToken = authHeader[1];
            AccessToken.getOneData({access_token: accessToken}, (err, token) => {
                if (err) {
                    return res.status(401).send({
                        message: "UNAUTHORIZED"
                    });
                }
                if (token) {
                    if (token.scope && scopes.filter((x) => {
                        return token.scope.indexOf(x) !== -1;
                    }).length === scopes.length) {
                        next();
                    } else {
                        res.status(401).send({
                            message: "UNAUTHORIZED"
                        });
                    }
                }
            })
        }

    }
};

exports.isAuthenticated = passport.authenticate('jwt', {session: false, scope: ['email']});