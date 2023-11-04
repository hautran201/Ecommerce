import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";


export const registerUser = async(req, res) => {
    try {

        const passwordHash = await bcrypt.hashSync(req.body.password, 10); 

        const newUser = new User({
            ...req.body,
            passwordHash: passwordHash
        });
        const user = await newUser.save();
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const loginUser = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(401).json({message: "User not found"});
        }
        
        const isUser  = bcrypt.compareSync(req.body.password, user.passwordHash);
        if(!isUser){
            return res.status(401).json({message: "Incorect credentials"});
        }

        const token = jwt.sign({user : user.id}, process.env.SECRET_KEY, {expiresIn: "1d"})

        
        res.cookie("accessToken",token,{ httpOnly: true}).status(200).json({user, token });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



