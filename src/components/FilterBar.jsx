function FilterBar({ filter, tasks, onChange }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.isCompleted === false,
  ).length;
  const completeTasks = totalTasks - pendingTasks;

  return (
    <>
      <div>
        <button onClick={() => onChange("all")}>All {totalTasks}</button>
        <button onClick={() => onChange("active")}>
          Active {pendingTasks}
        </button>
        <button onClick={() => onChange("completed")}>
          Completed {completeTasks}
        </button>
      </div>
    </>
  );
}
export default FilterBar;
