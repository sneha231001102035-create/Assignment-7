import {
  createContext,
  useContext,
  useState,
} from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      header: "Complete React Assignment",
      description:
        "Complete React Router and Authentication assignment.",
      priority: "High",
      category: "Academic",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Pending",
    },

    {
      id: 2,
      header: "Buy Groceries",
      description:
        "Purchase groceries and household items.",
      priority: "Medium",
      category: "Personal",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Raised",
    },

    {
      id: 3,
      header: "Study JavaScript",
      description:
        "Revise JavaScript concepts before examination.",
      priority: "High",
      category: "Academic",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Closed",
    },
  ]);

  // Add Task
  const addTask = (task) => {

    const newTask = {
      ...task,
      id: Date.now(),
      raisedDate: new Date().toLocaleString(),
      status: "Raised",
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  };

  // Update Task
  const updateTask = (id, updatedTask) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(id)
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {

    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== Number(id)
      )
    );
  };

  // Complete Task
  const completeTask = (id) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(id)
          ? {
              ...task,
              status: "Closed",
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
