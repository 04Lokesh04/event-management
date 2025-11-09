import { CURATED_TIMEZONES } from "../../assets/timeZoneData.js";
import './index.css'
export default function TimeZoneSelect({value, onChange, className}){
    return (
        <select className={`tzSelect ${className}`} value={value} onChange={(e)=>onChange(e.target.value)}>
            {CURATED_TIMEZONES.map(each=>(
                <option key={each.value} value={each.value}>{each.label}</option>
            ))}

        </select>
    )
}