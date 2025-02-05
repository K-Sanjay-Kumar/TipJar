import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        posts: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("Users", usersSchema);
export default Users;   