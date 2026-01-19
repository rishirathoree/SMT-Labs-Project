const SALT_ROUNDS = 10
require('dotenv').config()
const fs = require("fs");
const path = require("path");
const dirname = path.dirname(__filename);

const PUBLIC_JWT_EXPIRY = "1d";

const REFRESH_PUBLIC_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/refresh_public_key.pem"),
  "utf-8"
);

const REFRESH_PRIVATE_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/refresh_private_key.pem"),
  "utf-8"
);

const ACCESS_PUBLIC_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/access_public_key.pem"),
  "utf-8"
);

const ACCESS_PRIVATE_KEY = fs.readFileSync(
  path.join(dirname, "../token_secrets/access_private_key.pem"),
  "utf-8"
);



module.exports = {
    SALT_ROUNDS,
    REFRESH_PUBLIC_KEY,PUBLIC_JWT_EXPIRY, REFRESH_PRIVATE_KEY, ACCESS_PUBLIC_KEY, ACCESS_PRIVATE_KEY,
}
