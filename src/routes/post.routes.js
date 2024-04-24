import { Router } from "express";
import {
    createPost,
} from "../controllers/post.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/post-event").post(verifyJWT, createPost);


export default router;