const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { busProfileModel } = require("../models/profile");
const { generateAccessToken, generateRefreshToken } = require("../helpers/main");

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

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
            const isHasUserAlready = await userModel.findOne({ identifier: phone || email })

            if (isHasUserAlready) {
                return res.status(400).json({ message: "This username already exists" })
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            const dataUser = { password: hashPassword, role, }
            if (phone) {
                dataUser.identifier = phone
                dataUser.authMethod = "phone"
            }
            if (email) {
                dataUser.identifier = email
                dataUser.authMethod = "email"
            }

            const user = await userModel.create({ ...dataUser })

            if (role === "business") {
                await busProfileModel.create({ userId: user._id })
            } else if (role === "personal") {
                await busProfileModel.create({ userId: user._id })
            }

            const accessToken = generateAccessToken({ id: user._id, role })
            const refreshToken = generateRefreshToken({ id: user._id, role });

            return res.status(201).json({ message: "Пользователь успешно зарегистрирован", refreshToken, accessToken, role })

        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.stack });
            // return res.status(400).json("error")
        }
    }
    async authWithGoogle(req, res) {
        try {
            const { identifier, role } = req.body

            const isHasUserAlready = await userModel.findOne({ identifier })
            if (isHasUserAlready) {
                const accessToken = generateAccessToken({ id: isHasUserAlready._id, role: isHasUserAlready.role })
                const refreshToken = generateRefreshToken({ id: isHasUserAlready._id, role: isHasUserAlready.role });

                return res.status(201).json({
                    message: "Пользователь успешно зарегистрирован", refreshToken, accessToken, role: isHasUserAlready.role
                });
            } else {
                const user = await userModel.create({ identifier, role, authMethod: "google" })

                if (role === "business") {
                    await busProfileModel.create({ userId: user._id })
                } else if (role === "personal") {
                    await busProfileModel.create({ userId: user._id })
                }

                const accessToken = generateAccessToken({ id: user._id, role: user.role })
                const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

                return res.status(201).json({ message: "Пользователь успешно зарегистрирован", refreshToken, accessToken, role: user.role })
            }

          
        } catch (error) {
            return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: error.stack });
            // return res.status(400).json("error")
        }
    }
    async SignIn(req, res) {
        try {
            const { identifier, password } = req.body

            // const findUser = {
            //     $or: [
            //         { phone: identifier },
            //         { password: identifier }
            //     ]
            // }

            const user = await userModel.findOne({ identifier })
            if (!user) {
                return res.status(400).json({ message: "Пользовател не найденo", })
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)

            if (!isValidPassword) {
                return res.status(400).json({ message: `Пользовател не найденo` })
            }

            const accessToken = generateAccessToken({ id: user._id, role: user.role })
            const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

            // console.log(user);
            return res.status(201).json({ message: "Пользователь успешно авторизовано!", accessToken, refreshToken, role: user.role })

        } catch (error) {

        }
    }

    async GoogleAuth(req, res) {
        // const { credential, client_id } = req.body;
        // try {
        //     const ticket = await client.verifyIdToken({
        //         idToken: credential,
        //         audience: client_id,
        //     });
        //     const payload = ticket.getPayload();
        //     console.log(payload, "payload");

        //     const userid = payload['sub'];
        //     res.status(200).json({ payload });
        // } catch (err) {
        //     res.status(400).json({ err });
        // }
    }
}

module.exports = new User

