const users = require("../../models/users.models");
const { ApiError, ApiResponse } = require("../libs/class.lib");
const { asyncHandler } = require("../libs/helper.lib");
const organizations = require("../../models/organization.models");
const categories = require("../../models/categories.models");
const products = require("../../models/products.models");

const Create = asyncHandler(async(req,res)=>{
    const orgId = req.orgId
    const {name,description,sku,stock,categoryId,price} = req.body
    // const prd  = await products.insertMany(req.body.map((item)=>{
    //     return {
    //         ...item,
    //         categoryId:item.categoryIds,
    //         organizationId:orgId
    //     }
    // }))
    const prd = await products.create({name,description,sku,stock,organizationId:orgId,categoryId,price})

    return res.status(200).json(new ApiResponse(200,{products:prd},"Product created successfully"))
})

const Get = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10,categoryId } = req.query;
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

    if(categoryId){
        filter.name = { $regex: categoryId, $options: "i" }; 
    }

    const total = await products.countDocuments(filter);

    let query = products.find(filter).sort({ createdAt: -1 })

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
                products: producst,
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
module.exports = {
    Create,
    Get
}