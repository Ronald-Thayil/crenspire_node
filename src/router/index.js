import { Router } from "express";
import { responseData, statusCode } from "../helper/helper.js";
import user from './user.js'
import product from './product.js'
const router = Router();


router.get("/checkServer", (req, res) => {
  return responseData({
    res,
    statusCode: statusCode.SUCCESS,
    message: "Called Successfully",
  });
});


router.use(user)
router.use(product)

export default router;
