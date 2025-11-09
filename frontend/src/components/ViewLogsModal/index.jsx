import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../store/eventsSlice";
import dayjs from "../../lib/time.js";
import "./index.css";
import { FiClock } from "react-icons/fi";

function ViewLogsModal({ show, onHide, eventId, viewerTz }) {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.events.logsById[eventId] || []);
  const profiles = useSelector((state) => state.profiles.users);

  useEffect(() => {
    if (show && eventId) {
      dispatch(fetchLogs(eventId));
    }
  }, [show, eventId, dispatch]);

  const formatFull = (d) =>
    dayjs(d).tz(viewerTz).format("MMM DD YYYY [at] HH:mm");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Logs</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!logs || logs.length === 0 ? (
          <div>No logs yet</div>
        ) : (
          <ul className="mainLog">
            {logs.map((l) => (
              <li className="eachlog" key={l._id}>
                
                <div className="logTime">
                    <span><FiClock /> {formatFull(l.createdAtUtc)}</span> 
                  
                </div>

                {l.changes.map((c, i) => {
                  let label = "";

                  if (c.field === "profileIds") {
                    const newNames = (c.to || [])
                      .map(
                        (id) =>
                          profiles.find((p) => p._id === id)?.name || id
                      )
                      .join(", ");
                    label = `Profiles changed to: ${newNames}`;
                  } 
                  
                  else if (c.field === "eventTimeZone") {
                    label = `Timezone changed to: ${c.to}`;
                  } 
                  
                  else if (c.field === "startUtc") {
                    label = `Start date/time updated`;
                  } 
                  
                  else if (c.field === "endUtc") {
                    label = `End date/time updated`;
                  } 
                  
                  else {
                    label = `${c.field} updated`;
                  }

                  return (
                    <div key={i} className="logItem">
                       {label}
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewLogsModal;
