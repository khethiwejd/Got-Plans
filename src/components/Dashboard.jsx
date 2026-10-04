import { useNavigate } from "react-router-dom";
import { useEvents } from "../EventContext";
import EventList from "./EventList";

// Function hepls display all the events and stats for the user and their events
export default function Dashboard() {
  const navigate = useNavigate();
  const { events, deleteEvent } = useEvents();

  function handleDelete(eventId) {
    const confirmed = window.confirm("Are we really cancelling this event?");

    if (!confirmed) {
      return;
    }

    deleteEvent(eventId);
  }

  return (
    <div className="dashboard">
      <div className="welcome">
        <span>
          <h3>Dashboard</h3>
        </span>
        <h1>Upcoming Events</h1>

        <p>Who? When? What? This is how i keep my schedule.</p>
      </div>

      <button className="addButton" onClick={() => navigate("/add-event")}>
        + Add An Event
      </button>
      <br />
      <section className="eventStat">
        <div>
          <p>Total Events</p>
          <strong>{events.length}</strong>
        </div>

        <div>
          <p>Scheduled</p>
          <strong>{events.length}</strong>
        </div>

        <div>
          <p>Locations</p>
          <strong>
            {
              new Set(events.map((event) => event.location).filter(Boolean))
                .size
            }
          </strong>
        </div>
      </section>
      <br />
      <section>
        <h2>Your Events</h2>

        <p>
          {events.length === 0
            ? "You haven't added any new events yet."
            : `${events.length} event${
                events.length !== 1 ? "s" : ""
              } scheduled`}
        </p>

        <EventList events={events} onDelete={handleDelete} />
      </section>
    </div>
  );
}
