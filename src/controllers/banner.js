const bannerModel = require("../models/banner")

class Banner {
    async createBanner(req, res) {
        try {
            const { title, startDate, endDate, description, productIds, image, url } = req.body

            const response = await bannerModel.create({ title, startDate, endDate, description, productIds, image,url })
            await res.json({ message: "Баннер успешно создано!", ...response })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание баннера!" })
        }
    }
    async updateBanner(req, res) {
        try {
            const { title, startDate, endDate, description, productIds, image, _id,url } = req.body

            const response = await bannerModel.findByIdAndUpdate(_id, { title, startDate, endDate, description, productIds, image ,url})
            await res.json({ message: "Баннер успешно создано!", ...response })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание баннера!" })
        }
    }
    async deleteBanner(req, res) {
        try {
            const { _id } = req.params
            const response = await bannerModel.findByIdAndDelete(_id)
            await res.json({ message: "Баннер успешно удалено!" })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при удаление  баннера!" })
        }
    }
    async getBanners(req, res) {
        try {
            const { page, limit } = req.query
            const defaultPage = parseInt(page) || 1
            const defaultLimit = parseInt(limit) || 15
            const skip = (defaultPage - 1) * defaultLimit;
            console.log(page, limit, "page, limit");

            const response = await bannerModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            const count = await bannerModel.countDocuments()
            await res.json({ result: response, count, page: defaultPage, limit: defaultLimit })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при получение баннеры!" })
        }
    }
}

module.exports = new Banner

// const page = parseInt(req.query.page) || 1;
// const limit = 30;  // Number of items per page
// const skip = (page - 1) * limit;

// const requests = await requestModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
// const count = await requestModel.countDocuments()

// await res.json({ result: requests, page: page, limit: limit, count })