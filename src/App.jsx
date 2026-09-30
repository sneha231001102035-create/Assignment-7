import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";

function Layout() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Application */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="tasks"
          element={<Tasks />}
        />

        {/* Dynamic Route */}
        <Route
          path="tasks/:id"
          element={<TaskDetails />}
        />

        <Route
          path="add-task"
          element={<AddTask />}
        />

        <Route
          path="completed"
          element={<CompletedTasks />}
        />

      </Route>

      {/* Invalid URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;
