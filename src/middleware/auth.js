import UserData from "../model/user.js";
import jsonwebtoken from "jsonwebtoken";
import { responseData, statusCode, verifyUserToken } from "../helper/helper.js";

const secret_key = "*@#$%^&*()-_=+";
const verifyToken = async (req, res, next) => {
  debugger;
  let token = req.headers["x-access-token"] || req.headers?.authorization;
  debugger;
  if (token) {
    token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
  } else {
    return responseData({
      res,
      statusCode: statusCode.UNAUTHORIZED,
      success: 0,
      message: "Unauthorized Request",
    });
  }

  jsonwebtoken.verify(token, secret_key, async (err, decoded) => {
    if (!decoded || err) {
      return responseData({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: "Token Expired",
      });
    }

    const users = await UserData.findOne({ _id: decoded.id });
    if (!users)
      return responseData({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: "No user Found",
      });
    delete users.password;
    req.user = users;
    next();
  });
};

export default verifyToken;
