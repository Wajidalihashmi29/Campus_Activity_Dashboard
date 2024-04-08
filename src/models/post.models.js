import mongoose, { Schema } from "mongoose";

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
        descriptionOfEvent: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        dateofEvent: {
            type: Date,
            required: true,
            default: Date.now
        },
        registrationLink: {
            type: String,
            required: true,
            unique: true,
            validate: urlValidator,
        },
        
    }
)
var validate = require('mongoose-validator')
var urlValidator = [
    validate(
        {
            validator: value => validator.isURL(
                value, { 
                    protocols: ['http','https','ftp'],
                    require_tld: true,
                    require_protocol: true
                }
            ),
            message: 'Must be a Valid URL'
        }
    )
]


export const Posts = mongoose.model("Post", postSchema);