import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        
    } catch (error) {
        console.log("mongoose not connected", error)
        process.exit(1)
    }
    
}