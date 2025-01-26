const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    role: { type: String, default: "personal" },
    isActive: { type: Boolean, default: true },
    identifier: { type: String, require: true, unique: true },
    // phone: { type: String, default: "", unique: false },
    // email: { type: String, default: "", unique: false },
    password: { type: String, default: "" },
    // googleId: { type: String, default: "" },
    authMethod: { type: String, default: "" },
}, { timestamps: true })

const userModel = model("user", userSchema)
module.exports = userModel

// clientID 
//280306366451-v3mfjnv9gcvpb1gj4iqb42fmgcqg8qp9.apps.googleusercontent.com