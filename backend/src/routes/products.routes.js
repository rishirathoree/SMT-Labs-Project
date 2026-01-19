const {Router} = require("express")
const { Create ,Get} = require("../controllers/products.controller")
const { CheckJwt } = require("../middlewares/jwt.middleware")

const router = Router()

router
.post("/create",CheckJwt,Create)
.get("/",CheckJwt,Get)

module.exports = router