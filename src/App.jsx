import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const retrived_data = localStorage.getItem("tasks");
      return retrived_data ? JSON.parse(retrived_data) : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => {
        return task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task;
      }),
    );
  }

  function changeFilter(item) {
    setFilter(item);
  }

  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <FilterBar filter={filter} tasks={tasks} onChange={changeFilter} />
      <TaskList
        filter={filter}
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </>
  );
}

export default App;
