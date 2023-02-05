import { Router } from "express";
// import { register, login } from "../controller/user.Controller.js";
import {product} from "../controller/product.Controller.js"
import verifyToken from "../middleware/auth.js"

const router = Router();

router.get("/getProducts",verifyToken,product);

export default router;
