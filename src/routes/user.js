/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Регистрация пользователь
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {identifier: phone number (format; 996700128475) or gmail, password: more 6 charecter, role: business or personal, }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /signin:
 *   post:
 *     summary: Авторизация пользователь
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {identifier: phone number (format; 996700128475) or gmail, password: more 6 charecter }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */

const Router = require("express")
const User = require("../controllers/user")
const router = new Router()

router.post("/signup", User.SignUp)
router.post("/signin", User.SignIn)

module.exports = router