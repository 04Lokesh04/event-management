import { createSlice } from "@reduxjs/toolkit";

const systemTz=Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

const slice=createSlice({
    name:'ui',
    initialState:{
        userTimezone:systemTz,
        selectedProfileId:null
    },

    reducers:{
        setUserTimezone:(state,action)=>{state.userTimezone=action.payload},
        setSelectedProfileId:(state, action)=>{state.selectedProfileId=action.payload}
    }
})

export const {setUserTimezone, setSelectedProfileId}=slice.actions
export default slice.reducer