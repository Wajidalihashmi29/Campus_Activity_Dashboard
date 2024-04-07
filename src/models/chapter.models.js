import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema(
    {
        chapterName:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true
        },
        chapterDescription: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        postHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }

);


export const Chapter = mongoose.model("Chapter", chapterSchema );