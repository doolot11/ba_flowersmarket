const { Router } = require("express")


const router = new Router()
const Banner = require("../controllers/banner")

router.post("/create", Banner.createBanner)
router.put("/update", Banner.updateBanner)
router.delete("/delete/:_id", Banner.deleteBanner)
router.get("/get-all?page=15&limit=14", Banner.getBanners)

module.exports = router

/**
 * @swagger
 * /api/banner/create:
 *   post:
 *     tags: [banner]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String, startDate: String, endDate: String, description: String, productIds: [], image: String, url: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/banner/update:
 *   put:
 *     tags: [banner]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { title: String, startDate: String, endDate: String, description: String, productIds: [], image: String, _id: String,url: String }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/banner/delete/:_id:
 *   delete:
 *     tags: [banner]
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Баннер успешно удалён"
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /api/banner/get-all?page=1&limit=15:
 *   get:
 *     tags: [banner]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */