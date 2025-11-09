import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api.js";

export const fetchevents=createAsyncThunk('events/fetch', async(profileId)=>{
    const {data}= await api.get(`/api/event/?profileId=${profileId}`)
    return data
})

export const createEvent=createAsyncThunk('events/create', async(payload)=>{
    const {data}=await api.post("/api/event/", payload)
    return data 
})

export const updateEvent=createAsyncThunk('events/update', async({eventId, patch})=>{
    const {data}=await api.patch(`/api/event/${eventId}`, patch)
    return data
})

export const fetchLogs=createAsyncThunk('events/fetchLogs', async(eventId)=>{
    const {data}=await api.get(`/api/event/${eventId}/logs`)
    return {eventId, logs:data}
})

const slice=createSlice({
    name:"events",
    initialState:{
        events:[],
        logsById:{},
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchevents.fulfilled, (state, action)=>{state.events=action.payload})
        builder.addCase(createEvent.fulfilled, (state, action)=>{state.events.push(action.payload)})
        builder.addCase(updateEvent.fulfilled, (state, action)=>{
            const idx=state.events.findIndex(e=>e._id===action.payload._id)
            if (idx >-1) state.events[idx]=action.payload
        })
        builder.addCase(fetchLogs.fulfilled, (state, action)=>{state.logsById[action.payload.eventId]=action.payload.logs})
    }
})

export default slice.reducer