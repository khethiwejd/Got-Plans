import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  // adding an event function
  function addEvent(eventData) {
    const newEvent = {
      id: Date.now(),
      ...eventData,
    };

    setEvents((previousEvents) => [...previousEvents, newEvent]);
  }

  // updating an event function
  function updateEvent(id, updatedData) {
    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              ...updatedData,
            }
          : event,
      ),
    );
  }

  //   Deleting an event function
  function deleteEvent(id) {
    setEvents((previousEvents) =>
      previousEvents.filter((event) => event.id !== id),
    );
  }

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
