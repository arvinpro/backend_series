import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String, // AWS/Cloudinary link
        required: true,
    },
    thumbnail: {
        type: String, // AWS/Cloudinary link
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPugblished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

},

{
    timestamps: true,
})

videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model('Video', videoSchema);