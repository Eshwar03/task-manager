import styles from "../css/taskheader.module.css";
function TaskHeader({ filter }) {
  return filter === "all" ? (
    <div className={styles.activeFilter}>All Tasks</div>
  ) : filter === "pending" ? (
    <div className={styles.activeFilter}>Pending tasks</div>
  ) : (
    <div className={styles.activeFilter}>Completed tasks</div>
  );
}
export default TaskHeader;
