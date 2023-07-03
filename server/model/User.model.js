import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique Username"],
        unique: [true, "Username already exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
    },
    firstName: {type:String},
    lastName: {type:String},
    mobile: {type: Number},
    address: {type:String},
    profile: {String},
})

export default mongoose.model.Users || mongoose.model('User', UserSchema)