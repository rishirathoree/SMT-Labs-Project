const {Router} = require("express");
const router = Router()
const { CreateUsers,GetUsers,Login, CreateTeamate } = require("../controllers/users.controller");
const { SignupValidate } = require("../utils/validator.utils");
const { validate } = require("../middlewares/validate.middleware");
const { CheckJwt } = require("../middlewares/jwt.middleware")

router
.post("/create",SignupValidate(),validate,CreateUsers)
.get("/",CheckJwt,GetUsers)
.post("/login",Login)
.post("/team-user",CheckJwt,CreateTeamate)

module.exports = router