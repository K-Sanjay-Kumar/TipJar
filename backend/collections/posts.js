import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        author: {
            type: String,
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
        status:{
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Posts = mongoose.model("Posts", postsSchema);
export default Posts;