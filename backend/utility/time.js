import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
import tz from 'dayjs/plugin/timezone.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(customParseFormat)

export const localTimeToUtc= (localString, timezone)=>{
    
    return dayjs.tz(localString, "YYYY-MM-DD HH:mm", timezone).utc().toDate()

}

export const CheckStartEnd=(startUtc, endUtc)=>{
    return dayjs(endUtc).isAfter(dayjs(startUtc))
}