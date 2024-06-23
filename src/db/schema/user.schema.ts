import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    dob: {
        type: Date,
        required: [true, 'Please enter your date of birth'],
        immutable: true
    },
    gender: {
        type: String // I want the gender to be of 2 option only

        
    },
    country: {
        type: String,
        required: [true, 'Please enter your country']
    },

}, {timestamps: true});

export const User = mongoose.model('User', userSchema)