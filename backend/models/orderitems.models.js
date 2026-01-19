const { Schema, model } = require('mongoose')

const orderItemsSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: "orders" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true, })

const orderItems = new model("orderitems", orderItemsSchema)

module.exports = orderItems