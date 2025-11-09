import { useMemo,useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import TimeZoneSelect from "../TimeZoneSelect"
import dayjs from "../../lib/time.js"
import {fetchevents} from '../../store/eventsSlice.js'
import {setUserTimezone} from "../../store/uiSlice.js"
import EditEventModal from "../EditEventModal"
import ViewLogsModal from "../ViewLogsModal"
import './index.css'
import { TbUsers } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
function EventsPanel(){
    const dispatch=useDispatch()
    const event=useSelector(state=>state.events.events)
    const profiles=useSelector(state=>state.profiles.users)
    const viewerTz=useSelector(state=>state.ui.userTimezone)
    const selectedProfileId=useSelector(state=>state.ui.selectedProfileId)

    const [editFor, setEditFor]=useState(null)
    const [logsFor, setLogsFor]=useState(null)

    useEffect(()=>{
        if (selectedProfileId){
            dispatch(fetchevents(selectedProfileId))
        }
    }, [dispatch, selectedProfileId])

    const firstEvent=event?.[0]
    console.log(firstEvent)

    const startL=firstEvent ? dayjs(firstEvent.startUtc).tz(viewerTz).format("YYYY-MM-DD HH:mm") : ""
    const endL=firstEvent ? dayjs(firstEvent.endUtc).tz(viewerTz).format("YYYY-MM-DD HH:mm"):""

    const startDateL = firstEvent ? dayjs(firstEvent.startUtc).tz(viewerTz).format("DD MMM YYYY") : "";
    const startTimeL = firstEvent ? dayjs(firstEvent.startUtc).tz(viewerTz).format("HH:mm") : "";

    const endDateL = firstEvent ? dayjs(firstEvent.endUtc).tz(viewerTz).format("DD MMM YYYY") : "";
    const endTimeL = firstEvent ? dayjs(firstEvent.endUtc).tz(viewerTz).format("HH:mm") : "";


    const created=firstEvent ? dayjs(firstEvent.createdAtUtc).tz(viewerTz).format("YYYY-MM-DD HH:mm"):""
    
    const createdDate = firstEvent ? dayjs(firstEvent.createdAtUtc).tz(viewerTz).format("DD MMM YYYY") : "";
    const createdTime = firstEvent ? dayjs(firstEvent.createdAtUtc).tz(viewerTz).format("HH:mm") : "";

    const updated=firstEvent ? dayjs(firstEvent.updatedAtUtc).tz(viewerTz).format("YYYY-MM-DD HH:mm"):""

    const updatedDate = firstEvent ? dayjs(firstEvent.updatedAtUtc).tz(viewerTz).format("DD MMM YYYY") : "";
    const updatedTime = firstEvent ? dayjs(firstEvent.updatedAtUtc).tz(viewerTz).format("HH:mm") : "";

    const usernames=firstEvent ? (firstEvent.profileIds || []).map(each=>profiles.find(p=>p._id===each)?.name || each).join(", ") : ""

    return (
        <div className="card2">
            <h1 className="cardTitle2">Event</h1>
            <div className="profileCreateCard2">
                <label className="profilesCardLabel">Viewer TimeZone</label>
                <TimeZoneSelect value={viewerTz} onChange={(tz)=>dispatch(setUserTimezone(tz))} />
            </div>

            <div className="EventCard">
                {!firstEvent && <p className="Noevent"> No events</p>}
        

                {firstEvent && (
                    <>
                        <div className="eventdetails">

                            <div className="eventRow">
                               <TbUsers className="usersAre1" /> 
                               <p className="usersAre">
                                  {usernames}
                               </p>
                            </div>

                            <div className="eventRow"> 
                                <MdOutlineDateRange className="calenderPanel" />
                                <div className="dateTime">
                                    <h1 className="datePanel">Start :{startDateL}</h1>
                                    <p className="timepanel"><span><FiClock/> </span>{startTimeL}</p> 
                                </div>
                            </div>
                            <div className="eventRow"> 
                                <MdOutlineDateRange className="calenderPanel"/>
                                <div className="dateTime">
                                    <h1 className="datePanel">End :{endDateL}</h1>
                                    <p className="timepanel"><span><FiClock/> </span>{endTimeL}</p> 
                                </div> 
                            </div>

                            <hr className="line"/>
                            <div className="eventRow">
                                <p className="updatespara">Created: <span>{createdDate}</span> at <span>{createdTime}</span></p>
                            </div>
                            <div className="eventRow">
                                <p className="updatespara">Updated: <span>{updatedDate}</span> at <span>{updatedTime}</span> </p>
                                
                            </div>
                            <hr className="line"/>

                            <div className="eventActions">
                                <button className="editandview" onClick={()=>setEditFor(firstEvent)}>
                                    <span className="editandviewIcon"><FaRegEdit /></span> Edit</button>
                                <button className="editandview" onClick={()=>setLogsFor(firstEvent._id)}>
                                    <span className="editandviewIcon"><LuFileSpreadsheet /></span>
                                    View Logs</button>
                            </div>
                        </div> 

                        
                    </>
                    
                    
                )}
                    
                
                <div className="lastbuttons">
                    <EditEventModal show={!!editFor} onHide={()=>setEditFor(null)} event={editFor} />
                    <ViewLogsModal show={!!logsFor} onHide={()=>setLogsFor(null)} eventId={logsFor} viewerTz={viewerTz} />
                </div>
            </div>
        </div>
    )
}


export default EventsPanel