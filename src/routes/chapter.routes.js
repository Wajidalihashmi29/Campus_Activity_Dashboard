import { Router } from "express";
import { 
    login,
    logout,
    register, 
    refreshAccessToken,
    getCurrentUser,
    changePassword,
    postHistory,
    adminPostHistory
} from "../controllers/chapter.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    register
)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/post-history").get(verifyJWT, postHistory)
router.route("/admin-post-history").get(verifyJWT, adminPostHistory)

export default router;