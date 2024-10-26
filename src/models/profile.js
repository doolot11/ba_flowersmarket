const { Schema, model } = require("mongoose");

const busProfileSchema = new Schema({
    nameShop: { type: String, default: "" },
    phone2: { type: String, default: "" },
    phone3: { type: String, default: "" },
    isVerificated: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    description: { type: String, default: "" },
    urlShop: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "user", require: true },
    adressShopIds: [{ type: Schema.Types.ObjectId, ref: "addressShop" }],
    orderIds: [{ type: Schema.Types.ObjectId, ref: "order" }],
    banners: [{ type: Schema.Types.ObjectId, ref: "banner" }],
    postIds: [{ type: Schema.Types.ObjectId, ref: "post" }],
}, { timestamps: true })

const persProfileSchema = new Schema({
    fullName: { type: String, default: "" },
    phone2: { type: String, default: "" },
    isVerificated: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    adressDelIds: [{ type: Schema.Types.ObjectId, ref: "addressDel" }],
    orderIds: [{ type: Schema.Types.ObjectId, ref: "order" }],
}, { timestamps: true })

const busProfileModel = model("busProfile", busProfileSchema)
const persProfileModel = model("persProfile", persProfileSchema)

module.exports = { busProfileModel, persProfileModel }
