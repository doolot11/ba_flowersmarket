const { busProfileModel } = require("../models/profile")


class Profile {
    async getShops(req, res) {
        try {
            const shops = await busProfileModel.find({ isAdSlider: true }).select("nameShop avatar")
            return res.json(shops)
        } catch (error) {
            return res.status(500).json({ message: "Произашло ошибка!", error })
        }
    }
}

module.exports = new Profile