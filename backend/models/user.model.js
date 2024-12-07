import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    dateofbirth: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            // Ensure the date is in the past
            return value < Date.now();
          },
          message: "Date of birth must be in the past.",
    }},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true});

export const User = mongoose.model("User",userSchema);