const users = require("../../models/users.models");
const { ApiError, ApiResponse } = require("../libs/class.lib");
const { asyncHandler } = require("../libs/helper.lib");
const { accessTokenCreate } = require("../libs/token.lib");
const { hashPassword, comparePassword } = require("../utils/bcrypt.utils");
const organizations = require("../../models/organization.models");

const CreateUsers = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body

    const hashed = await hashPassword(password)

    const findUser = await users.findOne({ email })

    if (findUser) {
        throw new ApiError(400, "User already exists", "Please try again with another email")
    }

    const addedUser = await users.create({
        name,
        email,
        password: hashed,
        role:"OWNER"
    })

    const token = accessTokenCreate({
        id: addedUser._id,
        role: addedUser.role
    })

    res.status(200).json(new ApiResponse(200, {u:addedUser,token}, "User created successfully"));
});

const GetUsers = asyncHandler(async (req, res, next) => {
    const orgId = req.orgId
    const usersu = await users.find({
        organizationId: orgId
    })
    return res.status(200).json(new ApiResponse(200, {users:usersu}, "Users found successfully"));
});

const Login = asyncHandler(async (req, res, next) => {
    
    const {email,password} = req.body
    
    const findU = await users.findOne({
        email
    })

    if(!findU){
        throw new ApiError(400,"User not found","Please create an account first")
    }

    if(!await comparePassword(password,findU.password)){
        throw new ApiError(400,"Incorrect password","Please try again with correct password")
    }

    const organization = await organizations.findOne({
        _id: findU.organizationId
    })

    const token = accessTokenCreate({
        id: findU._id,
        role: findU.role,
        orgId: organization?._id
    })
    
    return res.status(200).json(new ApiResponse(200, {u:findU,token,org:organization}, "User login successfully"))

});

const CreateTeamate = asyncHandler(async (req, res, ) => {
    const { name, email, password } = req.body
    const orgId = req.orgId

    const hashed = await hashPassword(password)

    const findUser = await users.findOne({ email })

    if (findUser) {
        throw new ApiError(400, "User already exists", "Please try again with another email")
    }

    const addedUser = await users.create({
        name,
        email,
        role:"STAFF",
        password: hashed,
        organizationId: orgId
    })

    return res.status(200).json(new ApiResponse(200, addedUser, "User created successfully"));
});

module.exports = {
    CreateUsers,
    GetUsers,
    CreateTeamate,
    Login,
}