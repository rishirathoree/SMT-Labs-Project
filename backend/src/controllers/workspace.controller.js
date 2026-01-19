const { asyncHandler } = require("../libs/helper.lib");
const organizations = require("../../models/organization.models");
const { ApiError, ApiResponse } = require("../libs/class.lib");
const { accessTokenCreate } = require("../libs/token.lib");
const users = require("../../models/users.models");

const Create = asyncHandler(async (req, res) => {

    const id = req.id
    const role = req.role
    const findExisting = await organizations.findOne({
        ownerId: id
    })

    if (findExisting) {

        const token = accessTokenCreate({
            id: findExisting._id,
            role: findExisting.role,
            orgId: findExisting._id
        })

        return res.status(200).json(new ApiResponse(200, { org: findExisting, token }, "Organization found successfully"))
    }

    const organization = await organizations.create({
        name: req.body.name,
        description: req.body.description,
        ownerId: id
    })

    const token = accessTokenCreate({
        id: organization._id,
        role: organization.role,
        orgId: organization._id
    })

    await users.findOneAndUpdate({
        _id: id
    }, {
        organizationId: organization._id
    })

    return res.status(200).json(new ApiResponse(200, { org: organization, token }, "Organization created successfully"))
})

const GetOrg = asyncHandler(async (req, res) => {
    const id = req.id
    const orgId = req.orgId
    const role = req.role
    const organization = await organizations.findOne({
        _id: orgId
    })
    if (!organization) {
        throw new ApiError(400, "Organization not found")
    }
    return res.status(200).json(new ApiResponse(200, organization, "Organization found successfully"))
})

module.exports = {
    Create,
    GetOrg,
}