import EventLog from '../models/logs.js'
import Event from '../models/event.js'
import { localTimeToUtc, CheckStartEnd } from '../utility/time.js'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
import tz from 'dayjs/plugin/timezone.js'
dayjs.extend(utc)
dayjs.extend(tz)

export const getEvent= async(req, res)=>{
    try {
        const {profileId}=req.query
        const event=await Event.find({profileIds:profileId})
        res.status(200).json(event)
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    } 

}

export const createEvent=async(req, res)=>{
    try {
        const {profileIds, timezone, startlocal, endlocal}=req.body
        
        if (!Array.isArray(profileIds)||profileIds.length==0){
            return res.status(400).json({message:"select at least one profile"})
        }

        if (!timezone || !startlocal || !endlocal){
            return res.status(400).json({message:"Missing required fields"})
        }

        // converting local time to utc to avoid time zone issues
        const startUtc=localTimeToUtc(startlocal, timezone)
        const endUtc=localTimeToUtc(endlocal, timezone)

        if (!CheckStartEnd(startUtc, endUtc)){
            return res.status(400).json({message:"End date cannot be lesser than start date"})
        }

        const createdEvents=await Event.create({profileIds, eventTimeZone:timezone, startUtc, endUtc})
        res.status(200).json(createdEvents)

        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

export const updateEvent=async(req, res)=>{
    try {
        const {eventId}=req.params 
        const {profileIds, timezone, startlocal, endlocal}=req.body

        const originalEvent=await Event.findById(eventId)
        if (!originalEvent){
            return res.status(404).json({message:"Event not found"})
        }

        const updates={}
        const changes=[]

        if (profileIds !==undefined && JSON.stringify(profileIds) !== JSON.stringify(originalEvent.profileIds)){
            updates.profileIds=profileIds
            changes.push({field:'profileIds', from:originalEvent.profileIds, to:profileIds})
        }

        if (timezone !==undefined && timezone !== originalEvent.eventTimeZone){
            updates.eventTimeZone=timezone
            changes.push({field:'eventTimeZone', from:originalEvent.eventTimeZone, to:timezone})
        }

        const originalStartUtc = originalEvent.startUtc
        const originalEndUtc = originalEvent.endUtc

        if (startlocal !==undefined){
            const tz= timezone || originalEvent.eventTimeZone
            const startUtc=localTimeToUtc(startlocal, tz)
            if (!dayjs(startUtc).isSame(originalStartUtc)) {
                
                updates.startUtc=startUtc
                changes.push({field:"startUtc", from:originalEvent.startUtc, to:startUtc})
           }
        }

        if (endlocal !==undefined){
            const tz= timezone || originalEvent.eventTimeZone
            const endUtc=localTimeToUtc(endlocal, tz)
             if (!dayjs(endUtc).isSame(originalEndUtc)){
                
                updates.endUtc=endUtc
                changes.push({field:"endUtc", from:originalEvent.endUtc, to:endUtc})
            }
        }
        const start=updates.startUtc || originalEvent.startUtc
        const end=updates.endUtc || originalEvent.endUtc

        if (!CheckStartEnd(start, end)){
            return res.status(400).json({message:"End date cannnot be lesser than start date"})
        }

        if (Object.keys(updates).length===0){
            return res.json(originalEvent)
        }

        const updatedEvent= await Event.findByIdAndUpdate(eventId, updates, {new:true})

        if (changes.length){
            await EventLog.create({eventId:updatedEvent._id,changes})
        }
        res.status(200).json(updatedEvent)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

export const getLogs=async(req, res)=>{
    try {
        const {eventId}=req.params 
        const logs=await EventLog.find({eventId}).sort({createdAtUtc:-1})
        res.status(200).json(logs)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}