import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import { useEvents } from "../EventContext";
import { useAuth } from "../AuthContext";

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
  const { user } = useAuth();

  function handleSubmit(eventData) {
    //for the user to see just their events
    const newEvent = {
      ...eventData,
      userId: user.userId,
    };

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
