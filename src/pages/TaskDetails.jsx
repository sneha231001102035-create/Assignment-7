import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useTasks,
} from "../context/TaskContext";

function TaskDetails() {

  const { id } = useParams();

  const {
    tasks,
    updateTask,
    deleteTask,
    completeTask,
  } = useTasks();

  const navigate = useNavigate();

  const task = tasks.find(
    (item) =>
      item.id === Number(id)
  );

  const [editing, setEditing] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

  if (!task) {

    return (
      <div className="no-tasks">

        <h2>
          Task Not Found
        </h2>

        <Link to="/tasks">
          Back to Tasks
        </Link>

      </div>
    );
  }

  const startEditing = () => {

    setEditData({
      header: task.header,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      status: task.status,
    });

    setEditing(true);
  };

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = () => {

    updateTask(id, editData);

    setEditing(false);
  };

  const handleDelete = () => {

    if (
      window.confirm(
        "Delete this task?"
      )
    ) {

      deleteTask(id);

      navigate("/tasks");
    }
  };

  return (
    <div>

      <div className="details-header">

        <Link to="/tasks">
          ← Back to Tasks
        </Link>

        <h1 className="page-title">
          Task Details
        </h1>

      </div>

      {editing ? (

        <div className="task-form">

          <label>
            Task Header
          </label>

          <input
            name="header"
            value={editData.header}
            onChange={handleChange}
          />

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <label>
            Priority
          </label>

          <select
            name="priority"
            value={editData.priority}
            onChange={handleChange}
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>

          <label>
            Category
          </label>

          <select
            name="category"
            value={editData.category}
            onChange={handleChange}
          >
            <option value="Academic">
              Academic
            </option>

            <option value="Personal">
              Personal
            </option>
          </select>

          <button
            className="submit-btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>

        </div>

      ) : (

        <div className="details-card">

          <div className="details-top">

            <h2>
              {task.header}
            </h2>

            <span
              className={`priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

          </div>

          <div className="detail-description">

            <h3>
              Description
            </h3>

            <p>
              {task.description}
            </p>

          </div>

          <div className="details-grid">

            <div>
              <strong>
                Task ID
              </strong>
              <p>{task.id}</p>
            </div>

            <div>
              <strong>
                Category
              </strong>
              <p>{task.category}</p>
            </div>

            <div>
              <strong>
                Raised Date & Time
              </strong>
              <p>{task.raisedDate}</p>
            </div>

            <div>
              <strong>
                Due Date
              </strong>
              <p>{task.dueDate}</p>
            </div>

            <div>
              <strong>
                Status
              </strong>
              <p>{task.status}</p>
            </div>

            <div>
              <strong>
                Priority
              </strong>
              <p>{task.priority}</p>
            </div>

          </div>

          <div className="details-actions">

            {task.status !== "Closed" && (
              <button
                className="complete-btn"
                onClick={() =>
                  completeTask(task.id)
                }
              >
                Mark as Completed
              </button>
            )}

            <button
              className="edit-btn"
              onClick={startEditing}
            >
              Edit Task
            </button>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete Task
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default TaskDetails;
