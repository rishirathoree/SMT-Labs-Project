const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, required: false },
    role: { type: String, required: false },
}, { timestamps: true, })

const users = new model("users", userSchema)

module.exports = users