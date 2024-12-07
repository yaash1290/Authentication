import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try {
        const {fullname ,dateofbirth, email , password}=req.body;

        if (!fullname ||!dateofbirth || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exist with this email",
                success:false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password , 10);

        await User.create({
            fullname,
            dateofbirth,
            email,
            password:hashedPassword,
        })

        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        })

    } catch (error) {
        console.log(error)
    }

}

export const login = async(req, res)=>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success : false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success : false
            })
        }

        const isPasswordMatched = await bcryptjs.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message:"Incorrect email or password",
                success : false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn : '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            dateofbirth: user.dateofbirth,
            email: user.email,
        }
        
        return res.status(200).cookie("token" , token , {maxAge : 1*24*60*60*1000, httpsonly:true, sameSite:"strict"}).json({
            message:`Welcome back ${user.fullname}`,
            token,
            user,
            name: user.fullname,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token"," ",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
