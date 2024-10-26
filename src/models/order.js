const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "post" },
    quantityOrder: { type: Number, default: 1 },
    adressDeliveryId: { type: Schema.Types.ObjectId, ref: "address" },
    customerId: { type: Schema.Types.ObjectId, ref: "persProfile" },
    timeDelivery: { type: String, default: Date.now },
    comment: { type: String, default: "" },
    status: { type: String, default: "new" },
})

const orderModel = model("order", orderSchema)
module.exports = orderModel