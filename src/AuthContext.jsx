import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

// save registered/logged in users in localStorage
// So that users can only see their own events.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("gotPlansCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(userData) {
    let savedUsers = [];
    // try-catch block incase of an error occuring.
    try {
      const storedData = localStorage.getItem("gotPlansUsers");
      savedUsers = storedData ? JSON.parse(storedData) : [];

      if (!Array.isArray(savedUsers)) {
        savedUsers = [];
      }
    } catch (error) {
      console.error("Could not read registered users:", error);
      savedUsers = [];
    }

    //id for users upon registration
    const newUser = {
      ...userData,
      userId: crypto.randomUUID(),
    };

    savedUsers.push(newUser);

    localStorage.setItem("gotPlansUsers", JSON.stringify(savedUsers));

    return {
      success: true,
      message: "Registration successful. Please log in.",
    };
  }

  function login(email, password) {
    let savedUsers = [];

    try {
      const storedData = localStorage.getItem("gotPlansUsers");

      savedUsers = storedData ? JSON.parse(storedData) : [];

      if (!Array.isArray(savedUsers)) {
        return {
          success: false,
          message: "Saved account data is invalid. Check local storage",
        };
      }
    } catch (error) {
      console.error("Error reading saved accounts:", error);

      return {
        success: false,
        message: "Could not read saved accounts",
      };
    }

    const registeredUser = savedUsers.find(
      (savedUser) =>
        savedUser.email.toLowerCase() === email.toLowerCase() &&
        savedUser.password === password,
    );

    if (!registeredUser) {
      return {
        success: false,
        message: "Maybe it's an incorrect email or password",
      };
    }

    setUser(registeredUser);

    localStorage.setItem("gotPlansCurrentUser", JSON.stringify(registeredUser));

    return {
      success: true,
    };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("gotPlansCurrentUser");
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: user !== null, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
