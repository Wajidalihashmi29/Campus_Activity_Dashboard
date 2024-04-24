import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Post } from "../models/post.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Chapter } from "../models/chapter.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createPost = asyncHandler(async (req, res) => {
    const {typeofEvent, titleOfEvent, descriptionOfEvent, dateofEvent, registrationLink} = req.body
    if ([typeofEvent, titleOfEvent, descriptionOfEvent, dateofEvent, registrationLink].some((field) => field?.trim()==="")) {
        throw new ApiError(400, "All fields are required!!!")
    }
    
    const existedPost = await Post.findOne({
        $or: [{titleOfEvent}, {registrationLink}]
    })

    if (existedPost) {
        throw new ApiError(409, "Post already existed with same Name or Registration Link!!!")
    }
    let eventImagePath;
    if(req.files && Array.isArray(req.files.eventImage) && req.files.eventImage.length > 0){
        eventImagePath = req.files.eventImage[0].path;
    }    
    
    if (!eventImagePath) {
        throw new ApiError(400,"Event Image required!!!")
    }
    const eventImage = await uploadOnCloudinary(eventImagePath)

    if (!eventImage) {
        throw new ApiError(400,"Something went wrong while uploading image!!!")
    }
    
    const post = await Post.create({
        eventImage: eventImage.url,
        typeofEvent, 
        titleOfEvent, 
        descriptionOfEvent, 
        dateofEvent,  
        registrationLink,
        chapter: req.user._id,
    });
    console.log(post)
    if (!post) {
        throw new ApiError(500, "Something went wrong while posting!!!")        
    }

    const chapter = await Chapter.findById(req.user._id);

    chapter.postHistory.push(post?._id);

    chapter.save({validateBeforeSave: true});

    const createdPost = await Post.findById(post._id).select();
    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            createdPost,
            "Posted Event Successfully!!!"
        )
    )
    
})








export {
    createPost,
    
}