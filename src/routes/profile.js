const { Router } = require("express")
const profile = require("../controllers/profile")

const router = new Router()

router.get("/get-shops/header", profile.getShops)

module.exports = router