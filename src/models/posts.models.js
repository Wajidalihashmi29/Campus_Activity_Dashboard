import Mongoose from "mongoose";

const postSchema = new schema(
    {
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
            validate: urlValidator,
        }
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


export const Posts = Mongoose.model("Posts", postSchema)