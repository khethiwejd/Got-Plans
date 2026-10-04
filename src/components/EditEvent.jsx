import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../EventContext";
import EventForm from "./EventForm";

// function that makes it possible for the user to edit the event in case of mistakes
export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, updateEvent } = useEvents();

  const event = events.find((event) => event.id.toString() === id);

  //   If statement to show if an event exists or not
  if (!event) {
    return (
      <div>
        <h2>We don't have this event.</h2>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  function handleSubmit(updatedData) {
    updateEvent(event.id, updatedData);
    navigate("/dashboard");
  }

  //   Event form is shown with existing data
  return (
    <EventForm
      initialData={event}
      editing={true}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/dashboard")}
    />
  );
}
