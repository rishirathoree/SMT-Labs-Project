const {Router} = require("express")
const { CheckJwt } = require("../middlewares/jwt.middleware")
const { Create,Get, CancelOrder } = require("../controllers/orders.controller")
const router = Router()

router
.post("/create",CheckJwt,Create)
.get("/",CheckJwt,Get)
.post("/cancel-order/:id",CheckJwt,CancelOrder)

module.exports = router