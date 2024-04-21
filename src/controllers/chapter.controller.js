import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Chapter } from "../models/chapter.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const register = asyncHandler(async (req, res) => {
    const {chapterName, chapterDescription, email, password, username} = req.body
    
    if([chapterName, chapterDescription, email, password, username].some((field) => field?.trim()==="")){
        throw new ApiError(400, "All feilds are Required!!!")
    }

    const existedChapter = await Chapter.findOne({
        $or: [{email}, {username}]
    })

    if (existedChapter){
        throw new ApiError(409, "Chapter with username or email already exists!!!")
    }
    let avatarImagePath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarImagePath = req.files.avatar[0].path;
    }
    
    
    if (!avatarImagePath) {
        throw new ApiError(400,"Avatar required")
    }
    const avatar = await uploadOnCloudinary(avatarImagePath)

    if (!avatar) {
        throw new ApiError(400,"Avatar required")
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