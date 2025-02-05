import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("contactus", contactusSchema);
export default Users;   