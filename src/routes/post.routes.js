import { Router } from "express";
import {
    createPost,
    getAllFuturePosts
} from "../controllers/post.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import jwt from "jsonwebtoken";

const router = Router()

router.route("/post-event").post(
    upload.fields([
        {
            name: "eventImage",
            maxCount: 1
        }
    ]),
    verifyJWT, 
    createPost);
router.route("/get-all-posts").get(getAllFuturePosts)

export default router;