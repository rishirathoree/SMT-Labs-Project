const users = require("../../models/users.models");
const { ApiError, ApiResponse } = require("../libs/class.lib");
const { asyncHandler } = require("../libs/helper.lib");
const organizations = require("../../models/organization.models");
const categories = require("../../models/categories.models");

const Create = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const orgId = req.orgId
    const organization = await organizations.findOne({
        _id: orgId
    })
    if (!organization) {
        throw new ApiError(400, "Organization not found")
    }
    const category = await categories.create({
        name,
        description,
        organizationId: orgId
    })

    // const category = await categories.insertMany(req.body.map((item)=>{
    //     return {
    //         ...item,
    //         organizationId:orgId
    //     }
    // }))

    return res.status(200).json(new ApiResponse(200, category, "Category created successfully"))
});


const Get = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    const orgId = req.orgId

    const isAll = page === "all";

    if (!isAll) {
        page = parseInt(page);
        limit = parseInt(limit);
    }

    const total = await categories.countDocuments();

    let query = categories.find({organizationId:orgId}).sort({ createdAt: -1 });

    if (!isAll) {
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }

    const categoiries = await query;

    const totalPages = isAll ? 1 : Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                categories: categoiries,
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
    Create,Get
}