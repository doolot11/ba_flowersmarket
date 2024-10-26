const { Router } = require("express")
const order = require("../controllers/order")

const router = new Router()

router.post("/create", order.createOrder)
router.put("/update", order.updateOrder)
router.put("/delete/:_id", order.deleteOrder)

module.exports = router

/**
 * @swagger
 * /api/order/create:
 *   post:
 *     tags: [order]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:  
 *              { productId: String, quantityOrder: "", adressDeliveryId: "_id", timeDelivery: "", comment: ""}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /api/order/update:
 *   put:
 *     tags: [order]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { quantityOrder: "", adressDeliveryId: "_id", timeDelivery: "", comment: "", _id: "" }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/order/delete:
 *   delete:
 *     tags: [order]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */