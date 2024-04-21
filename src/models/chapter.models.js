import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const chapterSchema = new Schema(
    {
        chapterName: {
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
            required: [true, 'Password is required!!'],
        },
        avatar:{
            type: String, // Cloudinary url
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

chapterSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next() 
})
chapterSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

chapterSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            chapterName: this.chapterName,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
chapterSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Chapter = mongoose.model('Chapter', chapterSchema );