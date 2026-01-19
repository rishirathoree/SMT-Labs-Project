const { Schema, model } = require('mongoose')

const ordersSchema = new Schema({
    orderSequence: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "organizations" },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, enum: ['completed', 'cancelled'] },
},{timestamps:true})

const orders = new model("orders", ordersSchema)

module.exports = orders