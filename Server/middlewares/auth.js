const jwt = require('jsonwebtoken');
const User = require('../Models/User.Model');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorisation").replace("Bearer ", "") || req.body.token;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "token not found"
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });

    }
}