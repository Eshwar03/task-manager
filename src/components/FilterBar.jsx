import styles from "../css/filterbar.module.css";
function FilterBar({ filter, tasks, onChange }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.isCompleted === false,
  ).length;
  const completeTasks = totalTasks - pendingTasks;

  return (
    <>
      <div className={styles.taskHeading}>My Tasks</div>
      <div className={styles.filterContainer}>
        <div
          className={`${styles.filterItems} ${filter == "all" ? styles.filterActive : ""}`}
          onClick={() => onChange("all")}
        >
          <div>All Tasks</div>
          <div> {totalTasks}</div>
        </div>
        <div
          className={`${styles.filterItems} ${filter == "pending" ? styles.filterActive : ""}`}
          onClick={() => onChange("pending")}
        >
          <div>Pending</div> <div>{pendingTasks}</div>
        </div>
        <div
          className={`${styles.filterItems} ${filter == "completed" ? styles.filterActive : ""}`}
          onClick={() => onChange("completed")}
        >
          <div>Completed</div>
          <div>{completeTasks}</div>
        </div>
      </div>
    </>
  );
}
export default FilterBar;
