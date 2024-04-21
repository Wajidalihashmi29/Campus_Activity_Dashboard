import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        chapter: {
            type: Schema.Types.ObjectId,
            ref: "Chapter"
        },
        eventImage: {
            type: String, //Cloudinary url
            required: true,
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
        
    },
    {
        timestamps: true
    }
)

postSchema.plugin(mongooseAggregatePaginate)

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


export const Post = mongoose.model('Post', postSchema);