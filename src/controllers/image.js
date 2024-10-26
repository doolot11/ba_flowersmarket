const imageModel = require("../models/image")

class Image {
    async createImage(req, res) {
        try {
            console.log(req.params, ",kdmked");
            // const { filename } = req.file
            const respons = await imageModel.create({ image: req.file.filename })
            await res.json({ ...respons })
        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при загрузка фото!", error })
        }
    }
    async updateImage(req, res) {
        try {
            const { _id } = req.body
            const respons = await imageModel.findByIdAndUpdate(_id, { image: req.file.filename }, { new: true })
            await res.json({ ...respons })
        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при загрузка фото!", error })
        }
    }
}

module.exports = new Image