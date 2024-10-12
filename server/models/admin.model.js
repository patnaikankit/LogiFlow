import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { 
    type: String, 
    required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: Number,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
            accessToken: {
                token: String,
                expireAt: Date
            }
    },
}, { timestamps: true });

export const adminModel = mongoose.model("Admin", adminSchema)