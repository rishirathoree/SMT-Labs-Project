const {Schema, model} = require('mongoose')

const organizationSchema = new Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    ownerId:{type: Schema.Types.ObjectId, ref: "users"}
}, { timestamps: true, })

const organizations = new model("organizations", organizationSchema)

module.exports = organizations