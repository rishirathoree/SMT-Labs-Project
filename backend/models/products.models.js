const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "organizations", index: true },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "categories", index: true }]
}, { timestamps: true, })

productSchema.index(
    { organizationId: 1, sku: 1 },
    { unique: true }
);

module.exports = model("products", productSchema);
