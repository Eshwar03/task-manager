import { useState, useRef, useEffect } from "react";
function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputref = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputref.current.focus();
    }
  }, [isEditing]);

  function handleSave(id) {
    if (!editText.trim()) {
      return;
    }
    onEdit(id, editText);
    setIsEditing(false);
  }
  function handleCancel() {
    setEditText(task.text);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") handleSave(task.id);
    if (event.key === "Escape") handleCancel(task.id);
  }

  return !isEditing ? (
    <li>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </li>
  ) : (
    <li>
      <input
        type="text"
        ref={inputref}
        value={editText}
        onChange={(event) => setEditText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleSave(task.id)}>Save</button>
      <button onClick={() => handleCancel(task.id)}>Cancel</button>
    </li>
  );
}
export default TaskItem;
