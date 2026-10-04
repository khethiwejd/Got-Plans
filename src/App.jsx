// import { useState } from "react";

// import Dashboard from "./components/Dashboard";
// import EventForm from "./components/EventForm";
// import NavBar from "./routes/NavBar";

// import { useEvents } from "./EventContext";

// import "./App.css";

// const emptyForm = {
//   name: "",
//   date: "",
//   time: "",
//   description: "",
//   location: "",
// };

// function App() {
//   const { events, addEvent, updateEvent, deleteEvent } = useEvents();

//   const [view, setView] = useState("dashboard");

//   const [editingEvent, setEditingEvent] = useState(null);

//   const [formData, setFormData] = useState(emptyForm);

//   // start creating events function
//   function startCreating() {
//     setEditingEvent(null);
//     setFormData(emptyForm);
//     setView("form");
//   }

//   // Start editing an event function
//   function startEditing(event) {
//     console.log("START EDITING:", event);

//     setEditingEvent(event);

//     setFormData({
//       name: event.name,
//       date: event.date,
//       time: event.time,
//       description: event.description,
//       location: event.location,
//     });

//     setView("form");
//   }

//   // Submit form function

//   function handleFormSubmit(eventData) {
//     if (editingEvent) {
//       updateEvent(editingEvent.id, eventData);
//     } else {
//       addEvent(eventData);
//     }

//     setEditingEvent(null);
//     setFormData(emptyForm);
//     setView("dashboard");
//   }

//   // Deleting an event function
//   function handleDelete(eventId) {
//     const confirmed = window.confirm("So you're cancelling this event?");

//     if (!confirmed) {
//       return;
//     }

//     deleteEvent(eventId);
//   }

//   // Cancel form function
//   function handleCancel() {
//     setEditingEvent(null);
//     setFormData(emptyForm);
//     setView("dashboard");
//   }

//   // // Adding an event
//   // function addEvent(eventData) {
//   //   const newEvent = {
//   //     id: Date.now(),
//   //     ...eventData,
//   //   };

//   //   setEvents((previousEvents) => [...previousEvents, newEvent]);

//   //   setView("dashboard");
//   // }

//   // // Update an event
//   // function updateEvent(eventData) {
//   //   setEvents((previousEvents) =>
//   //     previousEvents.map((event) =>
//   //       event.id === editingEvent.id
//   //         ? {
//   //             ...event,
//   //             ...eventData,
//   //           }
//   //         : event,
//   //     ),
//   //   );

//   //   setEditingEvent(null);
//   //   setView("dashboard");
//   // }

//   return (
//     <div className="App">
//       <NavBar />

//       {view === "dashboard" && (
//         <Dashboard
//           events={events}
//           onAddEvent={startCreating}
//           onEdit={startEditing}
//           onDelete={handleDelete}
//         />
//       )}

//       {view === "form" && (
//         <EventForm
//           initialData={formData}
//           editing={Boolean(editingEvent)}
//           onSubmit={handleFormSubmit}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
