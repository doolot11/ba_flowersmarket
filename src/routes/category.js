/**
 * @swagger
 * /api/category/create:
 *   post:
 *     tags: [category]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/category/update:
 *   put:
 *     tags: [category]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */

const Router = require("express")
const upload = require("../middlewares/upload")
const category = require("../controllers/category")
const router = new Router()

router.post("/create", category.createCategory)
router.post("/update", category.updateCategory)

module.exports = router