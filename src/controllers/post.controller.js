import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Post } from "../models/post.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Chapter } from "../models/chapter.models.js";


const createPost = asyncHandler(async(req, res) => {
    const {eventImage, typeofEvent, titleOfEvent, descriptionOfEvent, dateofEvent, registrationLink} = req.body
    if ([eventImage, typeofEvent, titleOfEvent, descriptionOfEvent, dateofEvent, registrationLink].some((field) => field?.trim()==="")) {
        throw new ApiError(400, "All fields are required!!!")
    }

    const post = Post.create({
        eventImage,
        typeofEvent, 
        titleOfEvent, 
        descriptionOfEvent, 
        dateofEvent,  
        registrationLink,
        owner: req.user._id,
    });

    if (!post) {
        throw new ApiError(500, "Something went wrong while posting!!!")        
    }

    const chapter = await Chapter.findById(req.user._id);
    chapter.postHistory.push(slot?._id);
    chapter.save({validateBeforeSave: true});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            post,
            "Posted Event Successfully!!!"
        )
    )
    
})







export {
    createPost
}