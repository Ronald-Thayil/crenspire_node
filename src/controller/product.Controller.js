import { responseData, statusCode } from "../helper/helper.js";
import { getProduct } from "../service/product.service.js";

export const product = async (req, res) => {
  try {
    const result = await getProduct(req);
    if (!result)
      return responseData({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Something went Wrong",
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
