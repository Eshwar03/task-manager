import TaskItem from "./TaskItem";
function TaskList({ tasks, filter, onDelete, onToggle }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
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
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </>
  );
}
export default TaskList;
