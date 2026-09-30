import {
  Link,
} from "react-router-dom";

import {
  useTasks,
} from "../context/TaskContext";

function TaskCard({ task }) {

  const {
    deleteTask,
    completeTask,
  } = useTasks();

  const handleDelete = () => {

    if (
      window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      deleteTask(task.id);
    }
  };

  const handleComplete = () => {
    completeTask(task.id);
  };

  return (
    <div className="task-card">

      <div className="task-card-header">

        <h3>
          {task.header}
        </h3>

        <span
          className={`priority ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

      </div>

      <p className="description">
        {task.description}
      </p>

      <div className="task-info">

        <p>
          <strong>
            Category:
          </strong>{" "}
          {task.category}
        </p>

        <p>
          <strong>
            Due:
          </strong>{" "}
          {task.dueDate}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}

          <span
            className={`status ${task.status.toLowerCase()}`}
          >
            {task.status}
          </span>
        </p>

      </div>

      <div className="task-actions">

        <Link
          to={`/tasks/${task.id}`}
          className="view-btn"
        >
          View Details
        </Link>

        {task.status !== "Closed" && (
          <button
            className="complete-btn"
            onClick={handleComplete}
          >
            Complete
          </button>
        )}

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;
