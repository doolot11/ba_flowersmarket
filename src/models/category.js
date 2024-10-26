const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    title: { type: String, default: "" },
    postIds: [{ type: Schema.Types.ObjectId, ref: "post" }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

const categoryModel = model("category", categorySchema)
module.exports = categoryModel
