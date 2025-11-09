import mongoose from "mongoose";

const schema={
    profileIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        index:true,
        required:true
    }],
    eventTimeZone:{
        type:String, required:true
    },
    startUtc:{
        type:Date, required:true
    },
    endUtc:{
        type:Date, required:true
    },
    
}

const EventSchema=new mongoose.Schema(schema, {timestamps:{
        createdAt:'createdAtUtc',
        updatedAt:'updatedAtUtc'
    }})
export default mongoose.model('Event', EventSchema)