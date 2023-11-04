import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    passwordHash : {
        type: String,
        required: true
    }, 
    phone:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ""
    },
    apartment: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    }
}, {timestamps: true});
const User = mongoose.model("User", UserSchema);

export default User;