const users = require("../../models/users.models");
const { ApiError, ApiResponse } = require("../libs/class.lib");
const { asyncHandler } = require("../libs/helper.lib");
const organizations = require("../../models/organization.models");
const categories = require("../../models/categories.models");
const products = require("../../models/products.models");
const orders = require("../../models/orders.models");
const orderItems = require("../../models/orderitems.models");

const Create = asyncHandler(async (req, res) => {
    const session = await orders.startSession()
    session.startTransaction()
    const orgId = req.orgId
    const orderItemsArr = req.body
    const totalAmount = orderItemsArr.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const organization = await organizations.findOne({
        _id: orgId
    })
    if (!organization) {
        throw new ApiError(400, "Organization not found")
    }
    const order = await orders.create({
        orderSequence: `ORD-${Date.now()}`,
        organizationId: orgId,
        totalAmount,
        status: "completed"
    })
    await orderItems.create(orderItemsArr.map((item) => {
        return {
            ...item,
            orderId: order._id
        }
    }))
    await order.save()
    await products.updateMany({
        _id: { $in: orderItemsArr.map((item) => item.productId) }
    },
        { $inc: { stock: -orderItemsArr.reduce((acc, item) => acc + item.quantity, 0) } })
    await session.commitTransaction()
    await session.endSession()
    return res.status(200).json(new ApiResponse(200, order, "Order created successfully"))
})

const Get = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, } = req.query;
    console.log(req.query,'req.query')
    const orgId = req.orgId
    // 🔹 Handle page=all
    const isAll = page === "all";

    if (!isAll) {
        page = parseInt(page);
        limit = parseInt(limit);
    }

    const filter = {
        organizationId:orgId
    }


    const total = await orders.countDocuments(filter);

    let query = orders.find(filter).sort({ createdAt: -1 }).populate("organizationId",'name');

    if (!isAll) {
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }

    const producst = await query;

    const totalPages = isAll ? 1 : Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                orders: producst,
                pagination: {
                    total,
                    totalPages,
                    currentPage: isAll ? "all" : page,
                    limit: isAll ? total : limit,
                    hasNextPage: !isAll && page < totalPages,
                    hasPrevPage: !isAll && page > 1
                }
            },
            "All categories fetched"
        )
    );
});


const CancelOrder = asyncHandler(async(req,res)=>{
    const orgId = req.orgId
    const orderId = req.params.id
    const session = await orders.startSession()
    session.startTransaction()
    const organization = await organizations.findOne({
        _id: orgId
    })
    if (!organization) {
        throw new ApiError(400, "Organization not found")
    }
    const order = await orders.findOneAndUpdate({
        _id:orderId,
        organizationId:orgId
    },{
        status:"cancelled"
    })
    // add invetory stock to products orderitems
    const orderItemsArr = await orderItems.find({
        orderId:orderId
    })
    await products.updateMany({
        _id: { $in: orderItemsArr.map((item) => item.productId) }
    },
        { $inc: { stock: orderItemsArr.reduce((acc, item) => acc + item.quantity, 0) } })
    await session.commitTransaction()
    await session.endSession()
    return res.status(200).json(new ApiResponse(200,{order},"Order cancelled successfully"))
})

module.exports = {
    Create, Get,CancelOrder
}