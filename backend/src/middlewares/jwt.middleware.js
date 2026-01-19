const jwt = require("jsonwebtoken");
const { ApiError } = require("../libs/class.lib");
const { asyncHandler } = require("../libs/helper.lib");
const { ACCESS_PRIVATE_KEY, ACCESS_PUBLIC_KEY } = require("../constant");
const CheckJwt = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.headers?.authorization?.split(" ")[1];

  if (!accessToken) {
    throw new ApiError(401, null, { msg: "No token found" });
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_PRIVATE_KEY, {
      algorithms: ["RS256"],
    });

    req.orgId = decoded?.orgId || null;
    req.id = decoded.id || null;
    req.role = decoded?.role || null;
    next();
  } catch (err) {
    throw new ApiError(401, null, { msg: "Invalid token" });
  }
});



module.exports = {
    CheckJwt
}