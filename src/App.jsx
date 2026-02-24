import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }
  console.log(tasks);
  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <FilterBar />
      <TaskList />
    </>
  );
}

export default App;
