const {body} = require("express-validator")

const SignupValidate = () => {
    return [
        body("name").not().isEmpty().withMessage("Name is required"),
        body("email").not().isEmpty().withMessage("Email is required"),
        body("password").not().isEmpty().withMessage("Password is required"),
    ]
}
module.exports = {
    SignupValidate
}