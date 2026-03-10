import { useState, useRef, useEffect } from "react";
import styles from "../css/taskitem.module.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputref = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputref.current.focus();
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
    <li className={styles.taskListItem}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />
      <div className={styles.textstretch}>{task.text}</div>
      <button className={styles.editButton} onClick={() => setIsEditing(true)}>
        <FaEdit className={styles.editIcon} />
      </button>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <MdDeleteForever className={styles.deleteIcon} />
      </button>
    </li>
  ) : (
    <li className={styles.taskListItem}>
      <input
        className={styles.editForm}
        type="text"
        ref={editInputref}
        value={editText}
        onChange={(event) => setEditText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.saveButton} onClick={() => handleSave(task.id)}>
        Save
      </button>
      <button
        className={styles.cancelButton}
        onClick={() => handleCancel(task.id)}
      >
        Cancel
      </button>
    </li>
  );
}
export default TaskItem;
