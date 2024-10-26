const { Router } = require("express")
const Address = require("../controllers/address")

const router = new Router()

router.post("/create", Address.createAddress)
router.put("/update", Address.updateAddress)
router.put("/delete/:_id", Address.deleteAddress)

module.exports = router

/**
 * @swagger
 * /api/address/create:
 *   post:
 *     tags: [address]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:  
 *              { recipient: "", phoneNumber1: "", address: "", isSelected: Boolean,}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /api/address/update:
 *   put:
 *     tags: [address]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { recipient: "", phoneNumber1: "", address: "", isSelected: Boolean, _id: "" }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /api/address/delete:
 *   delete:
 *     tags: [address]
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