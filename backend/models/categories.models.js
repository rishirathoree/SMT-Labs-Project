const {Schema, model} = require('mongoose')

const categoriesSchema = new Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    organizationId:{type: Schema.Types.ObjectId, ref: "organizations"}
}, { timestamps: true, })

const categories = new model("categories", categoriesSchema)

module.exports = categories