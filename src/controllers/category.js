const categoryModel = require("../models/category")


class Category {
    async createCategory(req, res) {
        try {
            const { title } = req.body

            const response = await categoryModel.create({ title })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание поста!" })
        }
    }
    async updateCategory(req, res) {
        try {
            const { title, _id, isActive } = req.body

            const response = await categoryModel.findByIdAndUpdate(_id, { title, isActive }, { new: true })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание поста!" })
        }
    }
}

module.exports = new Category