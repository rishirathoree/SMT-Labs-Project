const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../constants");

const passwordHasher = (password) => {
    const hashed = bcrypt.hashSync(password, SALT_ROUNDS);
    return hashed;
};

const bcrypterHashedPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
};

module.exports = {
    passwordHasher,
    bcrypterHashedPassword,
};