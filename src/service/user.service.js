import User from "../model/user.js";
import {
  statusCode,
  hashPassword,
  generateNewToken,
} from "../helper/helper.js";
import bcrypt from "bcrypt";



export const userRegister = async (req) => {
  let { phoneNo, password, name } = req.body;
  if (!phoneNo || !password || !name)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: "Field is Missing",
    };
  //   User Exist or not
  const checkUser = await User.findOne({ phoneNo });
  if (checkUser)
    return {
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: "User Allready Exist",
    };

  let hash = await hashPassword(password);

  const userData = new User({
    name,
    password: hash,
    phoneNo,
  });
  const result = await userData.save();
  if (!result)
    return {
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: responseMessage.REGISTER_ERROR,
    };

  let token = await generateNewToken({
    id: result._id,
  });

  let data = {
    name: result.name,
    phoneNo: result.phoneNo,
    token,
  };
  return {
    statusCode: statusCode.SUCCESS,
    success: 1,
    message: "Register SuccessFully",
    data,
  };
};
export const userLogin = async (req) => {
  const { phoneNo, password } = req.body;
  const result = await User.findOne({ phoneNo });
  if (!result)
    return {
      statusCode: statusCode.NOTFOUND,
      success: 0,
      message: "No user Found",
    };

  const passwordCheck = await bcrypt.compare(password, result.password);
  if (!passwordCheck) {
    return {
      statusCode: statusCode.UNAUTHORIZED,
      success: 0,
      message: "Password Not Match",
    };
  } else {
    let token = await generateNewToken({
      id: result._id,
    });

    let data = {
      name: result.name,
      phoneNo: result.phoneNo,
      token,
    };
    return {
      statusCode: statusCode.SUCCESS,
      success: 1,
      message: "Login Successfully",
      data,
    };
  }
};
