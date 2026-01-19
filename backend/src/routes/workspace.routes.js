const {Router}= require("express")
const {Create, GetOrg} = require("../controllers/workspace.controller")
const { CheckJwt } = require("../middlewares/jwt.middleware")
const router = Router()

router
.post("/create",CheckJwt,Create)
.get("/",CheckJwt,GetOrg)

module.exports  = router