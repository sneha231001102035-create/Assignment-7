import { Link } from "react-router-dom";

import {
  useTasks,
} from "../context/TaskContext";

function Dashboard() {

  const { tasks } = useTasks();

  const totalTasks =
    tasks.length;

  const raisedTasks =
    tasks.filter(
      (task) =>
        task.status === "Raised"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Closed"
    ).length;

  return (
    <div>

      <h1 className="page-title">
        Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card blue">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="dashboard-card orange">
          <h2>{raisedTasks}</h2>
          <p>Raised Tasks</p>
        </div>

        <div className="dashboard-card yellow">
          <h2>{pendingTasks}</h2>
          <p>Pending Tasks</p>
        </div>

        <div className="dashboard-card green">
          <h2>{completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>

      </div>

      <div className="dashboard-actions">

        <Link
          to="/add-task"
          className="primary-btn"
        >
          + Add New Task
        </Link>

        <Link
          to="/tasks"
          className="secondary-btn"
        >
          View All Tasks
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;
