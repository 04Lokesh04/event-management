import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {api} from '../api/api.js'


export const fetchProfiles=createAsyncThunk('profiles/fetch', async()=>{
    const {data}=await api.get('/api/profile')
    return data
})

export const createProfile=createAsyncThunk('profiles/create', async(payload)=>{
    const {data}=await api.post('/api/profile', payload)
    return data
})

const slice=createSlice({
    name:'profiles',
    initialState:{
        users:[],
        status:'idle'
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProfiles.fulfilled, (state, action)=>{state.users=action.payload; state.status="succeeded"})
        builder.addCase(createProfile.fulfilled, (state, action)=>{state.users.unshift(action.payload)})
    }
})

export default slice.reducer