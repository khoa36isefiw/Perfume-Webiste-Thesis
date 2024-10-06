const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authToken = {
    authenticationToken(req, res, next) {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader) {
            // Beaer [token]
            const token = authorizationHeader.split(' ')[1];
            if (!token) res.status(401).json('Unauthorized error!');
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                console.log(user);
                if (err) res.status(403).json('Forbidden action!');
                req.user = user;
                next();
            });
        } else {
            res.status(401).json('Unauthorized error!');
        }
    },

    verifyTokenAdmin(req, res, next) {
        authToken.authenticationToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).json('You are not allowed to this action!');
            }
        });
    },
};

module.exports = authToken;
