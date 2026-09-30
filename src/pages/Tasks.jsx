import { useState } from "react";

import TaskCard from "../components/TaskCard";

import {
  useTasks,
} from "../context/TaskContext";

function Tasks() {

  const { tasks } = useTasks();

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const filteredTasks =
    tasks.filter((task) => {

      const statusMatch =
        statusFilter === "All" ||
        task.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      return (
        statusMatch &&
        categoryMatch
      );
    });

  return (
    <div>

      <div className="page-heading">

        <h1 className="page-title">
          All Tasks
        </h1>

        <div className="filters">

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Raised">
              Raised
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Personal">
              Personal
            </option>

          </select>

        </div>

      </div>

      {filteredTasks.length === 0 ? (

        <div className="no-tasks">
          <h2>
            No tasks found
          </h2>

          <p>
            Try changing the filter.
          </p>
        </div>

      ) : (

        <div className="task-grid">

          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Tasks;
