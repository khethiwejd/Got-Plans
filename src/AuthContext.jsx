import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("gatherlyUser");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  function register(userData) {
    localStorage.setItem("gatherlyUser", JSON.stringify(userData));
  }

  function login(email, password) {
    const savedUser = localStorage.getItem("gatherlyUser");

    if (!savedUser) {
      return {
        success: false,
        message: "Register first so you can use out app. You have no account.",
      };
    }

    const registeredUser = JSON.parse(savedUser);

    if (
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {
      return {
        success: false,
        message: "Maybe it's an incorrect email or password",
      };
    }

    setUser(registeredUser);

    return {
      success: true,
    };
  }

  function logout() {
    setUser(null);
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
