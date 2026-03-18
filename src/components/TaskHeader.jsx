import styles from "../css/taskheader.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

function TaskHeader({ filter, setIsLeftBlock, isLeftBlock }) {
  return (
    <div className={styles.headerContainer}>
      <button
        className={`${
          isLeftBlock
            ? styles.giHamburgerMenuButton
            : styles.giHamburgerMenuButtonHidden
        } ${styles.giHamburgerMenuButtonUnhide}`}
        onClick={() => setIsLeftBlock((prev) => !prev)}
      >
        <GiHamburgerMenu className={styles.giHamburgerMenu} />
      </button>

      {filter === "all" ? (
        <div className={styles.activeFilter}>All Tasks</div>
      ) : filter === "pending" ? (
        <div className={styles.activeFilter}>Pending tasks</div>
      ) : (
        <div className={styles.activeFilter}>Completed tasks</div>
      )}
    </div>
  );
}
export default TaskHeader;
