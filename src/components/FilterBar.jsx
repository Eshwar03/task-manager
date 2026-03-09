import styles from "../css/filterbar.module.css";
function FilterBar({ filter, tasks, onChange }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.isCompleted === false,
  ).length;
  const completeTasks = totalTasks - pendingTasks;

  return (
    <>
      <label>My Tasks</label>
      <div className={styles.filterContainer}>
        <div onClick={() => onChange("all")}>All Tasks {totalTasks}</div>
        <div onClick={() => onChange("active")}>Pending {pendingTasks}</div>
        <div onClick={() => onChange("completed")}>
          Completed {completeTasks}
        </div>
      </div>
    </>
  );
}
export default FilterBar;
