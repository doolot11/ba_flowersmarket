/**
 * @swagger
 * /api/image/create:
 *   post:
 *     summary: (formData)
 *     tags: [image]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { image: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/image/update:
 *   post:
 *     summary: (formData)
 *     tags: [image]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { image: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
  */

const { Router } = require("express")
const image = require("../controllers/image")
const upload = require("../middlewares/upload")

const router = new Router() 

router.post("/create", upload.single("image"), image.createImage)
router.post("/update", upload.single("image"), image.updateImage)

module.exports = router