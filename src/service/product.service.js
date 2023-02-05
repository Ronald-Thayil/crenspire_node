import User from "../model/user.js";
import {
  statusCode,
  hashPassword,
  generateNewToken,
} from "../helper/helper.js";
import axios from "axios";

export const getProduct = async (req) => {
  let result = await axios.get(
    "http://www.mocky.io/v2/5d889c8a3300002c0ed7da42"
  );

  if (result) {
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: "Product List",
      data: result?.data?.items,
    };
  } else {
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: "Error in Fetching Product",
    };
  }
};
