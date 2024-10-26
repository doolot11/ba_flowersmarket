/**
 * @swagger
 * /all-posts:
 *   get:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String, description: String, price: String, images: Array, promotion: String, promotionType: String, categories: Array }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /create:
 *   post:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String, description: String, price: String, images: Array, promotion: String, promotionType: String, categories: Array }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /update:
 *   put:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String, description: String, price: String, images: Array, promotion: String, promotionType: String, categories: Array }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /delete:
 *   post:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { _id: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */

const Router = require("express")
const post = require("../controllers/post")
const upload = require("../middlewares/upload")
const router = new Router()

router.get("/all-posts", post.getAllPosts)
router.post("/create", post.createPost)
router.put("/update", post.updatePost)
router.post("/delete", post.deletePost)

module.exports = router