import React from 'react';

import TaskItem from './TaskItem';
import styles from '../css/tasklist.module.css';
const TaskList = React.memo(({ tasks, filter }) => {
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'pending') {
            return task.completed === false;
        }
        if (filter === 'completed') {
            return task.completed === true;
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
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </>
    );
});
export default TaskList;
