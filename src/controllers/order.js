const orderModel = require("../models/order")


class Order {
    async createOrder(req, res) {
        try {
            const { productId, quantityOrder, adressDeliveryId, timeDelivery, comment } = req.body
            const response = await orderModel.create({ productId, quantityOrder, adressDeliveryId, timeDelivery, comment })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при создание заказа!", error })
        }
    }
    async updateOrder(req, res) {
        try {
            const { quantityOrder, adressDeliveryId, timeDelivery, comment, _id } = req.body
            const response = await orderModel.findByIdAndUpdate(_id, { quantityOrder, adressDeliveryId, timeDelivery, comment }, { new: true })
            await res.json(response)

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при редактирование заказа!", error })
        }
    }
    async deleteOrder(req, res) {
        try {
            const { _id } = req.params
            const response = await orderModel.findByIdAndDelete(_id)
            await res.json({ message: "Успешно удалено заказ!" })

        } catch (error) {
            return res.status(400).json({ message: "Произашло ошибка при редактирование заказа!", error })
        }
    }
}

module.exports = new Order

// productId: { type: Schema.Types.ObjectId, ref: "post" },
//     quantityOrder: { type: Number, default: 1 },
//     adressDeliveryId: { type: Schema.Types.ObjectId, ref: "address" },
//     customerId: { type: Schema.Types.ObjectId, ref: "persProfile" },
//     timeDelivery: { type: String, default: Date.now },
//     comment: { type: String, default: "" },
//     status: { type: String, default: "" },