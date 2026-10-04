import { Outlet } from "react-router-dom";
import NavBar from "./routes/NavBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// This component makes sure the navbar stays in one place
