const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { busProfileModel } = require("../models/profile");
const { generateAccessToken, generateRefreshToken } = require("../helpers/main");

// Function to detect phone number or email
function detectStringType(input) {
    // Regex for Kyrgyzstan phone numbers in format 996700123456
    const phonePattern = /^996\d{9}$/;

    // Regex for email addresses
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (phonePattern.test(input)) {
        return "phone";
    } else if (emailPattern.test(input)) {
        return "email";
    } else {
        return "unknown";
    }
}


class User {
    async SignUp(req, res) {
        try {
            const { identifier, password, role } = req.body

            let phone
            let email

            if (detectStringType(identifier) === "phone") {
                phone = identifier
            } else if (detectStringType(identifier) === "email") {
                email = identifier
            } else {
                return res.status(400).json({ message: "identifier is unknown format" })
            }
            console.log("is phone", detectStringType(identifier));

            // password, role, fullName,
            const isHasUserAlready = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
            // console.log(isHasUserAlready, "isHasUserAlready");

            if (isHasUserAlready) {
                return res.status(400).json({ message: "This username already exists" })
            }

            const hashPassword = bcrypt.hashSync(password, 10)
            const user = await userModel.create({ password: hashPassword, role, phone, email })

            if (role === "business") {
                await busProfileModel.create({ userId: user._id })
            } else if (role === "personal") {
                await busProfileModel.create({ userId: user._id })
            }

            const accessToken = generateAccessToken({ id: user._id, role })
            const refreshToken = generateRefreshToken({ id: user._id, role });

            return res.status(201).json({ message: "Пользователь успешно зарегистрирован", refreshToken, accessToken, role })

        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', ...error });
            // return res.status(400).json("error")
        }
    }
    async SignIn(req, res) {
        try {
            const { identifier, password } = req.body

            const findUser = {
                $or: [
                    { phone: identifier },
                    { password: identifier }
                ]
            }

            const user = await userModel.findOne(findUser)
            if (!user) {
                return res.status(400).json({ message: "Пользовател не найденo", })
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)

            if (!isValidPassword) {
                return res.status(400).json({ message: `Пользовател не найденo` })
            }

            const accessToken = generateAccessToken({ id: user._id, role: user.role })
            const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

            console.log(user);
            return res.status(201).json({ message: "Пользователь успешно авторизовано!", accessToken, refreshToken, role: user.role })

        } catch (error) {

        }
    }
}

module.exports = new User

