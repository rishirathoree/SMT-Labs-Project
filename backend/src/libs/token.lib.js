require("dotenv").config()
const jwt = require('jsonwebtoken');
const { ACCESS_PRIVATE_KEY, PUBLIC_JWT_EXPIRY } = require("../constant");

const accessTokenCreate = (payload) => {
    console.log(payload,'payload')
    const token = jwt.sign(payload, ACCESS_PRIVATE_KEY, {expiresIn: PUBLIC_JWT_EXPIRY, algorithm: 'RS256' });
    return token;
}

module.exports = {
    accessTokenCreate,
}