import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const EventContext = createContext();

export function EventProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.userId;

  const [events, setEvents] = useState([]);

  // will show only the logged-in user's events
  useEffect(() => {
    if (!userId) {
      setEvents([]);
      return;
    }

    const savedEvents = localStorage.getItem(`gotPlans_${userId}`);
    const parsedEvents = savedEvents ? JSON.parse(savedEvents) : [];

    const myEvents = parsedEvents.filter((event) => event.userId === userId);

    setEvents(myEvents);
  }, [userId]);

  // adding an event function
  function addEvent(eventData) {
    if (!userId) return;

    const newEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      userId,
    };

    setEvents((previousEvents) => {
      const updatedEvents = [...previousEvents, newEvent];

      localStorage.setItem(`gotPlans_${userId}`, JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  }

  // updating an event function
  function updateEvent(id, updatedData) {
    if (!userId) return;

    setEvents((previousEvents) => {
      const updatedEvents = previousEvents.map((event) =>
        event.id === id && event.userId === userId
          ? {
              ...event,
              ...updatedData,
              userId: event.userId,
            }
          : event,
      );

      localStorage.setItem(`gotPlans_${userId}`, JSON.stringify(updatedEvents));

      return updatedEvents;
    });
  }

  //   Deleting an event function
  function deleteEvent(id) {
    if (!userId) return;

    setEvents((previousEvents) => {
      const updatedEvents = previousEvents.filter(
        (event) => !(event.id === id && event.userId === userId),
      );

      localStorage.setItem(`gotPlans_${userId}`, JSON.stringify(updatedEvents));

      return updatedEvents;
    });
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
