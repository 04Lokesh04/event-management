import mongoose from 'mongoose'
const schema={
    name:{
        type:String, required:true, trim:true
    },
    timezone:{
        type:String, default:"UTC"
    },
    
}
const ProfileSchema=new mongoose.Schema(schema, {timestamps:true})

export default mongoose.model('Profile', ProfileSchema)