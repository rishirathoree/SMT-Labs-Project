const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../constant");
const hashPassword = (password,) => {
    return bcrypt.hash(password, Number(SALT_ROUNDS));
};

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword
}