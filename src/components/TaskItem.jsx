import { useState, useRef, useEffect } from 'react';
import styles from '../css/taskitem.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, updateTodo } from '../services/api';
function TaskItem({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);
    const editInputref = useRef(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isEditing) {
            editInputref.current.focus();
        }
    }, [isEditing]);

    function handleCancel() {
        setEditText(task.text);
        setIsEditing(false);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') handleSave(task.id);
        if (event.key === 'Escape') handleCancel(task.id);
    }
    const updateTodoMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const onToggle = (value, id) => {
        const updateData = {
            completed: value,
        };
        console.log(updateData);
        updateTodoMutation.mutate({ id, updateData });
    };
    const handleSave = (id, value) => {
        if (!editText.trim()) {
            return;
        }
        const updateData = {
            title: value,
        };
        console.log(updateData);
        updateTodoMutation.mutate({ id, updateData });
        setIsEditing(false);
    };

    const onDelete = (id) => {
        deleteTodoMutation.mutate(id);
    };

    return !isEditing ? (
        <li className={styles.taskListItem}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.completed}
                onChange={(event) => onToggle(event.target.checked, task.id)}
            />
            <div className={styles.textstretch}>{task.title}</div>
            <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
            >
                <FaEdit className={styles.editIcon} />
            </button>
            <button
                className={styles.deleteButton}
                onClick={() => onDelete(task.id)}
            >
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
            <button
                className={styles.saveButton}
                onClick={() => handleSave(task.id, editText)}
            >
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
