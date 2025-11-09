import './index.css'
import ProfileSelector from '../ProfileSelector'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProfiles, createProfile} from "../../store/profilesSlice"
import {setSelectedProfileId} from "../../store/uiSlice"

function Navbar(){
    const dispatch= useDispatch()
    const profiles=useSelector(state=>state.profiles.users)
    const selected=useSelector(state=>state.ui.selectedProfileId)

    useEffect(()=>{
        dispatch(fetchProfiles())
    }, [dispatch])

    return (
        <nav className='nav'>
            <div className='navText'>
                <h1 className='navHeading'>Event Mangement</h1>
                <p className='navPara'>Create and manage Events across multiple time zones</p>
            </div>
            <div>
            <ProfileSelector 
            mode='single'
            profiles={profiles}
            selectedIds={selected?[selected]:[]}
            onChange={(ids)=>dispatch(setSelectedProfileId(ids[0]||null))}
            onCreateProfile={(name)=>dispatch(createProfile({name})).unwrap()}
            triggerLabel='Select User'/>
            </div>
        </nav>
    )
}

export default Navbar