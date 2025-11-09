import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileSelector from "../ProfileSelector/";
import TimeZoneSelect from "../TimeZoneSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "../../lib/time.js";
import { createEvent } from "../../store/eventsSlice.js";
import { createProfile } from "../../store/profilesSlice.js";
import { MdOutlineDateRange } from "react-icons/md";

import "./index.css";

function EventCreator() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.users);

  const [selectedIds, setSelectedIds] = useState([]);
  const [eventTz, setEventTz] = useState("Asia/Kolkata");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");

  const onCreateProfile = (name) =>
    dispatch(createProfile({ name })).unwrap();

  const buildLocalTimestamp = (dateObj, timeStr, tz) => {
    const dStr = dayjs(dateObj).format("YYYY-MM-DD");
    return dayjs.tz(`${dStr} ${timeStr}`, "YYYY-MM-DD HH:mm", tz);
  };

  const onCreate = async () => {
    if (!selectedIds.length || !startDate || !endDate) {
      alert("Select profiles, start, end date times correctly");
      return;
    }

    const startLocal = buildLocalTimestamp(startDate, startTime, eventTz);
    const endLocal = buildLocalTimestamp(endDate, endTime, eventTz);

    if (!endLocal.isAfter(startLocal)) {
      alert("End must be greater than Start");
      return;
    }

    await dispatch(
      createEvent({
        profileIds: selectedIds,
        timezone: eventTz,
        startlocal: startLocal.format("YYYY-MM-DD HH:mm"),
        endlocal: endLocal.format("YYYY-MM-DD HH:mm"),
      })
    );

    setSelectedIds([]);
    setStartDate(null);
    setStartTime("09:00");
    setEndDate(null);
    setEndTime("10:00");
  };

  return (
    <div className="card">
      <h1 className="cardTitle">Create Event</h1>

      <div className="profileCreateCard">
        <label className="profilesCardLabel">Profiles</label>
        <ProfileSelector
          mode="multi"
          profiles={profiles}
          selectedIds={selectedIds}
          onChange={setSelectedIds}
          onCreateProfile={onCreateProfile}
          triggerLabel="Select profiles"
        />
      </div>

      <div className="profileCreateCard">
        <label className="profilesCardLabel">TimeZone</label>
        <TimeZoneSelect
          value={eventTz}
          onChange={setEventTz}
          className="timezoneselectorcard"
        />
      </div>

      <div className="ProfileStartEndDateTime">
        <label className="profilesCardLabel">Start Date & Time</label>
        <div className="timeCard">
          <div className="dateWrapper">
            <MdOutlineDateRange className="calender" />
            <DatePicker
              className="date"
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Pick a date"
            />
          </div>
          <input
            className="timewrapper"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      <div className="ProfileStartEndDateTime">
        <label className="profilesCardLabel">End Date & Time</label>
        <div className="timeCard">
          <div className="dateWrapper">
            <MdOutlineDateRange className="calender" />
            <DatePicker
              className="date"
              selected={endDate}
              onChange={setEndDate}
              placeholderText="Pick a date"
            />
          </div>
          <input
            className="timewrapper"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button className="createButton" onClick={onCreate}>
        + Create Event
      </button>
    </div>
  );
}

export default EventCreator;
