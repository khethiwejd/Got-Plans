import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import { useEvents } from "../EventContext";

// Function that is responsible of adding new events to the planner
const emptyForm = {
  name: "",
  date: "",
  time: "",
  description: "",
  location: "",
};

export default function AddEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  function handleSubmit(eventData) {
    addEvent(eventData);
    navigate("/dashboard");
  }

  function handleCancel() {
    navigate("/dashboard");
  }

  return (
    <EventForm
      initialData={emptyForm}
      editing={false}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
