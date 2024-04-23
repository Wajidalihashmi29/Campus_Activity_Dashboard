import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Chapter } from "../models/chapter.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await Chapter.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave: false})

      return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}
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

const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    if(!username){
        throw new ApiError(400, "username is required!!!")
    }

    const user = await Chapter.findOne({
        $or: [{username}]
    })

    if(!user){
        throw new ApiError(404, "user doesnot exists!!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Password Incorrect!!")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await Chapter.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User Logged In Successfully"
    ))
})

const logout = asyncHandler(async(req, res) => {
    await Chapter.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res,next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorised request!!!")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await Chapter.findById(decodedToken?._id)
    
        if (!user){
            throw new ApiError(401, "Invalid refresh token!!!")
        }
    
        if (incomingRefreshToken !== usre?.refreshToken) {
            throw new ApiError(401, "Refresh token expired!!!")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token refreshed!!!"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token!!!')
    }

})



export {
    register,
    login,
    logout,
    refreshAccessToken,
};