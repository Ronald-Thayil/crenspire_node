import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const statusCode = {
  SUCCESS: 200,
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  CREATED: 201,
  SERVER_ERROR: 500,
};
const secret_key = "*@#$%^&*()-_=+";
export const responseData = ({
  res,
  statusCode,
  success,
  message,
  data,
  error,
}) => {
  const resultObj = {
    success: success,
    message: message,
    data: data,
    error: error,
  };
  return res.status(statusCode).send(resultObj);
};


export const verifyUserToken = async (token) => {
  const isVerified = jwt.verify(token, secret_key)
  return isVerified
}

export const hashPassword = async (value) => {
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(value, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

export const generateNewToken = async (payload, schedule = 60) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload, exp: Math.floor(Date.now() / 1000) + schedule * 60 },
      secret_key,
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
  return token;
};
