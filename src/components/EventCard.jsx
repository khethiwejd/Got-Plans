import { useNavigate } from "react-router-dom";

// This function shows how the events that have been added to the planner
export default function EventCard({ event, onDelete }) {
  const navigate = useNavigate();
  const eventDate = new Date(`${event.date}T${event.time}`);

  const day = eventDate.toLocaleDateString("en-US", {
    day: "2-digit",
  });

  const month = eventDate.toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <div className="eventCard">
      {/* date */}
      <strong>{day} </strong>
      <span>{month}</span>

      {/* event details */}
      <h3>{event.name}</h3>
      <div>
        <span>{event.time}</span>
        <br />
        {event.location && <span>{event.location}</span>}
      </div>
      {event.description && <p className="description">{event.description}</p>}

      {/* actions */}
      <div className="eventActions">
        <button
          type="button"
          className="editButton"
          onClick={() => navigate(`/edit-event/${event.id}`)}
        >
          Edit
        </button>

        <button
          type="button"
          className="deleteButton"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
