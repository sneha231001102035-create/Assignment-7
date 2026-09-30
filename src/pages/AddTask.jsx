import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useTasks,
} from "../context/TaskContext";

function AddTask() {

  const { addTask } = useTasks();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      header: "",
      description: "",
      priority: "Medium",
      category: "Academic",
      dueDate: "28 Aug 2026",
    });

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.header.trim() ||
      !formData.description.trim()
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    addTask(formData);

    navigate("/tasks");
  };

  return (
    <div>

      <h1 className="page-title">
        Add New Task
      </h1>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >

        <label>
          Task Header
        </label>

        <input
          type="text"
          name="header"
          placeholder="Enter task header"
          value={formData.header}
          onChange={handleChange}
          required
        />

        <label>
          Task Description
        </label>

        <textarea
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
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
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Academic">
            Academic
          </option>

          <option value="Personal">
            Personal
          </option>
        </select>

        <label>
          Due Date
        </label>

        <input
          type="text"
          value="28 Aug 2026"
          readOnly
        />

        <button
          type="submit"
          className="submit-btn"
        >
          Create Task
        </button>

      </form>

    </div>
  );
}

export default AddTask;
