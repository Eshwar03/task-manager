import TaskItem from "./TaskItem";
import styles from "../css/tasklist.module.css";
function TaskList({ tasks, filter, onDelete, onToggle, onEdit }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return task.isCompleted === false;
    }
    if (filter === "completed") {
      return task.isCompleted === true;
    }
    return true;
  });
  if (filteredTasks.length === 0) {
    return <p>No tasks here...</p>;
  }

  return (
    <>
      <ul className={styles.tasklist}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </>
  );
}
export default TaskList;
