import { useEffect, useRef, useMemo, useState } from "react";
import { PiCaretUpDownBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import './index.css'

function ProfileSelector({
    mode="single",
    profiles,
    selectedIds,
    onChange,
    onCreateProfile,
    triggerLabel="Select User",
    className=""
}){
    const [open, setOpen]=useState(false)
    const [query, setQuery]=useState("")
    const [add, setAdd]=useState(false)
    const [name, setName]=useState("")
    const ref=useRef(null)

    useEffect(()=>{
        const handler=(e)=>{
            if (ref.current && !ref.current.contains(e.target)){
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return ()=>document.removeEventListener("mousedown", handler)
    }, [])

    
    const filterNames=useMemo(()=>{
        const q=query.trim().toLowerCase()
        if (!q) return profiles
        return profiles.filter(each=>each.name.toLowerCase().includes(q))
    })

    const selectSingleUser=(id)=>{
        onChange([id])
        setOpen(false)
    }

    const selectMultipleUsers=(id)=>{
        if (selectedIds.includes(id)){
            const ids=selectedIds.filter(each=>each!==id)
            onChange(ids)
        }else{
            onChange([...selectedIds, id])
        }
    }

    const handleAdd=async()=>{
        if (!name.trim()){
            return 
        }

        await onCreateProfile(name)
        setName("")
        setAdd(false)
    }

    const selectorLabel=(()=>{
        if (mode=="single"){
            const sl=profiles.find(each=>each._id===selectedIds[0])
            return sl? sl.name:triggerLabel
        }else{
            if (!selectedIds.length) return "Select Profiles"
            return `${selectedIds.length} profiles selected`
        }
    })()

    return (
        <div className={`profSelector ${className} `}>

            <div className={`profileButton ${mode==="multi" ? "multicard":"sinlgecard"}`} onClick={()=>setOpen(prev=>!prev)}>
                <p className="selecttext">{selectorLabel}</p> <PiCaretUpDownBold/>
            </div>

            {open && (
                <div className="profPopup">
                    <input 
                        className="profSearch"
                        placeholder="Search profiles..."
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                    />

                    <div className="usersCard">
                        {
                            filterNames.length===0 ? (
                                <p className="Nousers"> No users available...</p>
                            ):(
                                filterNames.map(each=>
                                (
                                    <label key={each._id} className="profItem">
                                        {mode==="multi"? (
                                            // <>
                                            //     <input
                                            //     className="multiselectstyle"
                                            //     type="checkbox"
                                            //     checked={selectedIds.includes(each._id)}
                                            //     onChange={()=>selectMultipleUsers(each._id)} />
                                            //     <span className="userName">{each.name}</span>
                                            // </>
                                            <div
                                                className={`multiProfileItem ${selectedIds.includes(each._id) ? "is-active" : ""}`}
                                                onClick={() => selectMultipleUsers(each._id)}>
                                                {selectedIds.includes(each._id) ? (
                                                <span className="tickIcon"><FaCheck /></span>
                                                ) : (
                                                <span className="tickPlaceholder"></span>
                                                )}

                                                <span className="userName">{each.name}</span>
                                            </div>
                                        ):(
                                            <div className={`SingleProfileItem ${selectedIds[0]===each._id ? "is-active":""}`}
                                            onClick={()=>selectSingleUser(each._id)}>
                                                <span className="userName">{each.name}</span>

                                            </div>
                                        )}
                                    </label>
                                )
                                )
                            )
                        }
                    </div>

                    <div className="profileadder">
                        {!add ? (
                            <button className="addProfile" type="button" 
                            onClick={()=>setAdd(prev=>!prev)}>+ Add Profile</button>
                        ): (
                            <div className="profileCreate">
                                <input className="newProfile"
                                placeholder="user name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)} />
                                <button className="addUser" onClick={handleAdd}>Add</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileSelector