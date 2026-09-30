import TaskCard from "../components/TaskCard";

import {
  useTasks,
} from "../context/TaskContext";

function CompletedTasks() {

  const { tasks } = useTasks();

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Closed"
    );

  return (
    <div>

      <h1 className="page-title">
        Completed Tasks
      </h1>

      {completedTasks.length === 0 ? (

        <div className="no-tasks">

          <h2>
            No completed tasks
          </h2>

          <p>
            Completed tasks will
            appear here.
          </p>

        </div>

      ) : (

        <div className="task-grid">

          {completedTasks.map(
            (task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            )
          )}

        </div>

      )}

    </div>
  );
}

export default CompletedTasks;
