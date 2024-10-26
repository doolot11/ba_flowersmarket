const { Schema, model } = require("mongoose");

const imageSchema = Schema({
    image: { type: String, default: "" }
})

const imageModel = model("image", imageSchema)
module.exports = imageModel