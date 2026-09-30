import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Task Manager
      </div>

      <div className="nav-links">

        <span className="welcome-user">
          Hello, {username}
        </span>

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/tasks">
          Tasks
        </NavLink>

        <NavLink to="/add-task">
          Add Task
        </NavLink>

        <NavLink to="/completed">
          Completed
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
