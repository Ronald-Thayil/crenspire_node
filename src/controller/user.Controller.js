import { responseData, statusCode } from "../helper/helper.js";
import { userRegister,userLogin} from '../service/user.service.js'

export const register = async (req, res) => {
  try {
    const result = await userRegister(req);
    if (!result)
      return responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Error in Registration",
      });
    return responseData({ res, ...result });
  } catch (error) {
    return responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await userLogin(req);
    if (!result)
      return responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: responseMessage.LOGIN_ERROR,
      });
    return responseData({ res, ...result });
  } catch (error) {
    return responseData({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
};
