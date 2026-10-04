import { useEffect, useState } from "react";

// Form used to add events in order for the user.
// Ad display them accordingly
const emptyForm = {
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

export default function EventForm({
  initialData,
  editing,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({ ...emptyForm, ...initialData });

  useEffect(() => {
    setFormData({
      ...emptyForm,
      ...initialData,
    });
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formData);
  }

  return (
    <div className="eventForm">
      <div className="formHeader">
        <span>Events</span>

        <h1>{editing ? "Edit Event" : "Add New Event"}</h1>

        <p>{editing ? "Update Event Details." : "Add Details of New Event."}</p>
      </div>

      <form className="eventForm" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="What are we doing?"
          required
        />
        <br />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <br />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Where we at?"
          required
        />
        <br />
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Whats happening here?"
          rows="5"
          required
        />

        <br />
        <button type="button" className="cancelButton" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="addButton">
          {editing ? "Save Changes" : "Create Event"}
        </button>
      </form>
    </div>
  );
}
