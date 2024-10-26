const addressModel = require("../models/address")


class Address {
    async createAddress(req, res) {
        try {
            const { recipient, phoneNumber1, address, isSelected, } = req.body
            const response = await addressModel.create({ recipient, phoneNumber1, address, isSelected, })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание адреса!", error })
        }
    }
    async updateAddress(req, res) {
        try {
            const { recipient, phoneNumber1, address, isSelected, _id } = req.body
            const response = await addressModel.findByIdAndUpdate(_id, { recipient, phoneNumber1, address, isSelected, }, { new: true })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при редактирование адреса!", error })
        }
    }
    async deleteAddress(req, res) {
        try {
            const { _id } = req.params
            const response = await addressModel.findByIdAndDelete(_id)
            await res.json({ message: "Успешно удалено заказ!" })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при редактирование адреса!", error })
        }
    }
}

module.exports = new Address

//  recipient: { type: String, default: "" },
// phoneNumber1: { type: Number, default: "" },
// phoneNumber2: { type: Number, default: ""  },
// address: { type: Number, default: ""},
// isSelected: { type: Boolean, default: false },