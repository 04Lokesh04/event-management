import mongoose from "mongoose";

const ChangeSchema=new mongoose.Schema({
    field:{
        type:String, required:true 
    },
    from:{
        type:mongoose.Schema.Types.Mixed, default:null
    },
    to:{
        type:mongoose.Schema.Types.Mixed, default:null
    },
    
},{_id:false})

const LogSchema=new mongoose.Schema({
    eventId:{
        type:mongoose.Types.ObjectId,
        ref:'Event', index:true, required:true
    },
    changes:{
        type:[ChangeSchema], default:[]
    },
    
}, {timestamps:{
        createdAt:'createdAtUtc'
    }})

export default mongoose.model('EventLog', LogSchema)