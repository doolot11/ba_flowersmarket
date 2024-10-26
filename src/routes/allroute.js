/**
 * @swagger
 * components:
 *   schemas:
 *     profile:
 *       type: object
 *       required:
 *         - email
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: test
 *         email: 
 *           type: string
 *           description: test
 * 
 */

const Router = require("express")
const router = new Router()

const User = require("./user")
const Post = require("./post")
const Category = require("./category")
const Image = require("./image")
const Banner = require("./banner")
const Order = require("./order")
const Address = require("./address")

router.use("/user", User)
router.use("/post", Post)
router.use("/category", Category)
router.use("/image", Image)
router.use("/banner", Banner)
router.use("/order", Order)
router.use("/address", Address)

module.exports = router