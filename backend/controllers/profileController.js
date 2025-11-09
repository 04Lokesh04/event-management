import Profile from "../models/profile.js";

export const createProfile= async (req, res)=>{
    try {
        const {name}=req.body

        if (!name || !name.trim()){
            res.status(400).json({message:"Valid name is required"})
        
        }
        const user= await Profile.create({name})
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

export const getProfile=async(req, res)=>{
    try {
        const users=await Profile.find().sort({createdAt:-1})
        res.status(200).json(users)

    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}