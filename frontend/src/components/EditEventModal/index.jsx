import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileSelector from "../ProfileSelector/";
import TimeZoneSelect from "../TimeZoneSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "../../lib/time.js";
import { updateEvent } from "../../store/eventsSlice.js";
import { createProfile } from "../../store/profilesSlice.js";
import './index.css'
import { MdOutlineDateRange } from "react-icons/md";

function EditEventModal({ show, onHide, event }) {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.users);

  const [selectedIds, setSelectedIds] = useState([]);
  const [eventTz, setEventTz] = useState("UTC");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  const [original, setOriginal] = useState(null);

  const onCreateProfile = (name) => dispatch(createProfile({ name })).unwrap();

  const buildLocalTimestamp = (dateObj, timeStr, tz) => {
    const d = dayjs(dateObj).format("YYYY-MM-DD");
    return dayjs.tz(`${d} ${timeStr}`, "YYYY-MM-DD HH:mm", tz);
  };

  useEffect(() => {
    if (!event) return;

    const tz = event.eventTimeZone || "UTC";

    setSelectedIds(event.profileIds || []);
    setEventTz(tz);

    setStartDate(new Date(event.startUtc));
    setEndDate(new Date(event.endUtc));

    setStartTime(dayjs(event.startUtc).tz(tz).format("HH:mm"));
    setEndTime(dayjs(event.endUtc).tz(tz).format("HH:mm"));

    setOriginal({
      profileIds: event.profileIds || [],
      timezone: tz,
      startlocal: dayjs(event.startUtc).tz(tz).format("YYYY-MM-DD HH:mm"),
      endlocal: dayjs(event.endUtc).tz(tz).format("YYYY-MM-DD HH:mm"),
    });
  }, [event]);

  const onSave = async () => {
    if (!original) return;

    const startLocal = buildLocalTimestamp(startDate, startTime, eventTz);
    const endLocal = buildLocalTimestamp(endDate, endTime, eventTz);

    if (!endLocal.isAfter(startLocal)) {
      alert("End date must be greater than start date");
      return;
    }

    const patch = {};

    if (JSON.stringify(selectedIds) !== JSON.stringify(original.profileIds)) {
      patch.profileIds = selectedIds;
    }

    if (eventTz !== original.timezone) {
      patch.timezone = eventTz;
    }

    const startFmt = startLocal.format("YYYY-MM-DD HH:mm");
    const endFmt = endLocal.format("YYYY-MM-DD HH:mm");

    if (startFmt !== original.startlocal) {
      patch.startlocal = startFmt;
    }

    if (endFmt !== original.endlocal) {
      patch.endlocal = endFmt;
    }

    if (Object.keys(patch).length === 0) {
      onHide();
      return;
    }

    await dispatch(updateEvent({ eventId: event._id, patch }));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="editCard">

          <div className="editProfileCreateCard">
            <label className="editProfilesCardLabel">Profiles</label>
            <ProfileSelector
              mode="multi"
              profiles={profiles}
              selectedIds={selectedIds}
              onChange={setSelectedIds}
              onCreateProfile={onCreateProfile}
              triggerLabel="Select profiles"
            />
          </div>

          <div className="editProfileCreateCard">
            <label className="editProfilesCardLabel">TimeZones</label>
            <TimeZoneSelect value={eventTz} onChange={setEventTz} />
          </div>

          <div className="editProfileStartEndDateTime">
            <label className="editProfilesCardLabel">Start Date & Time</label>
            <div className="editTimeCard">
              <div className="editDateWrapper" >
                <MdOutlineDateRange className="editcalender" />
                <DatePicker className="editDate" selected={startDate} onChange={setStartDate} />
              </div>
              <input
                className="editTimewrapper"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <div className="editProfileStartEndDateTime">
            <label className="editProfilesCardLabel">End Date & Time</label>
            <div className="editTimeCard">
                <div className="editDateWrapper">
                    <MdOutlineDateRange className="editcalender" />
                    <DatePicker className="editDate" selected={endDate} onChange={setEndDate} />
                </div>
              
              <input
                className="editTimewrapper"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="editCancelButton" onClick={onHide}>
          Close
        </button>
        <button className="editSaveButton" onClick={onSave}>
          Update Event
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditEventModal;
