import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import e from 'express';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,  
        required: true,
        trim: true,
        index: true,
    },
    avatar:{
        type: String, //aws /cloudinary link
        required: true,
    },
    coverImage:{
        type: String, //aws /cloudinary link
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        }
    ],
    password: {
        type: String,
        required: [true,"password is required"],
    },
    refreshToken: {
        type: String,
    },
    
},
{
    timestamps: true,
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})   // yesma arrow function use garna mildaina kina arrow function le this ko context lai bind gardaina so this le userSchema lai point garcha


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({

        _id: this._id,
        username: this.username,
        email: this.email,
         fullname: this.fullname,
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
)
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,

    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
)
}

export const User = mongoose.model('User', userSchema);