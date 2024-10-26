const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
    recipient: { type: String, default: "" },
    phoneNumber1: { type: Number, default: "" },
    phoneNumber2: { type: Number, default: ""  },
    address: { type: Number, default: ""},
    isSelected: { type: Boolean, default: false },
})

const addressModel = model("address", addressSchema)
module.exports = addressModel