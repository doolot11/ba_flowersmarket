const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    role: { type: String, default: "personal" },
    isActive: { type: Boolean, default: true },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
}, { timestamps: true })

const userModel = model("user", userSchema)
module.exports = userModel