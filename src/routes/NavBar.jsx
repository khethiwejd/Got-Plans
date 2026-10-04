import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // two sets of links that show on the navbar
  // set one= links that only show to users that have not registered("register"+"login")
  // set two= links that show to users that are logged in("dashboard","Add event", "help")
  return (
    <header>
      <div>
        <div>
          <span>
            <h1>Got Plans</h1>
          </span>
        </div>

        <nav className="NavLinks">
          {!isLoggedIn ? (
            <div>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/add-event">Add Event</NavLink>
              <NavLink to="/help">Help</NavLink>

              <button className="navLink logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
