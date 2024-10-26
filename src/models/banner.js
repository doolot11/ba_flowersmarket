const { Schema, model } = require("mongoose");

const bannerSchema = new Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    url: { type: String, default: "" },
    image: { type: Schema.Types.ObjectId, ref: "image" },
    isActive: { type: Boolean, default: true },
    productIds: [{ type: Schema.Types.ObjectId, ref: "post" }],
}, { timestamps: true })

const bannerModel = model("banner", bannerSchema)
module.exports = bannerModel