import {configureStore} from '@reduxjs/toolkit'

import profilesReducer from "./profilesSlice"
import eventsReducer  from "./eventsSlice.js"
import uiReducer from "./uiSlice.js"

export const store=configureStore({
    reducer:{
        profiles:profilesReducer,
        events:eventsReducer,
        ui:uiReducer
    }
})