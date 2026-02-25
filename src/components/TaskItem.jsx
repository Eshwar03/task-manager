function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
export default TaskItem;
