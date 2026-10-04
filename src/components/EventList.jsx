import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

export default function EventList({ events = [], onDelete }) {
  const navigate = useNavigate();

  if (events.length === 0) {
    return (
      <div>
        <h3>Seems like you have nowhere to go yet</h3>
        <p>
          Looking forward to something? Add it so you won't forget about it.
        </p>

        <button className="addButton" onClick={() => navigate("/add-event")}>
          + First Event
        </button>
      </div>
    );
  }

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
}
