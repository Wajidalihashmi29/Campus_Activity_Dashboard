import { Router } from "express";
import {
    createPost,
} from "../controllers/post.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

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

export default router;