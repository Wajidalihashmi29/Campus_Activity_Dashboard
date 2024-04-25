import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        chapter: {
            type: Schema.Types.ObjectId,
            ref: "Chapter"
        },
        typeofEvent: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        titleOfEvent: {
            type: String,
            required: true,
        },
        descriptionOfEvent: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        dateofEvent: {
            type: String,
            required: true,
            default: Date.now
        },
        registrationLink: {
            type: String,
            required: true,
            unique: true,
        },
        
    },
    {
        timestamps: true
    }
)


export const Post = mongoose.model('Post', postSchema);