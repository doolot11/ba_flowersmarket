const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, default: "", require: true },
    description: { type: String, default: "", require: true },
    price: { type: Number, default: 0, require: true },
    images: [{ type: Schema.Types.ObjectId, ref: "image" }],
    feedbackIds: [{ type: String, ref: "feedback" }],
    promotion: { type: Number, default: 0 },
    promotionType: { type: String, default: "%" }, //percent & number
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    categories: [{ type: String, ref: "category" }],
    ownerId: { type: Schema.Types.ObjectId, ref: "busProfile" },

}, { timestamps: true })

const postModel = model("post", postSchema)
module.exports = postModel