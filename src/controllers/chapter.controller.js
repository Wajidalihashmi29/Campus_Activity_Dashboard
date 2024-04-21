import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Chapter } from "../models/chapter.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const register = asyncHandler(async (req, res) => {
    const {chapterName, chapterDescription, email, password, username} = req.body
    console.log("email", email)

    if([chapterName, chapterDescription, email, password, username].some((field) => field?.trim()==="")){
        throw new ApiError(400, "All feilds are Required!!!")
    }

    const existedChapter = Chapter.findOne({
        $or: [{email}, {username}]
    })

    if (existedChapter){
        throw new ApiError(409, "Chapter with username or email already exists!!!")
    }
    const avatarPath = req.files?.avatar[0]?.path;
    if (!avatarPath) {
        throw new ApiError(400,"Avatar file required")
    }
    const avatar = await uploadOnCloudinary(avatarPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file required")
    }

    const chapter = await Chapter.create({
        chapterName,
        username: username.toLowerCase(),
        avatar: avatar.url,
        email,
        password,
        chapterDescription
    })
    const createdChapter = await Chapter.findById(chapter._id).select(
        "-password -refreshToken"
    )
    if (!createdChapter) {
        throw new ApiError(500, "Something went wrong while registering user!!!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdChapter, "Chapter registered successfully")
    )

})




export {
    register,
};