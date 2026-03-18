import { useState, useRef, useEffect } from "react";
import styles from "../css/taskform.module.css";

function TaskForm(props) {
  const [inputs, setInputs] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  function submitForm(e) {
    e.preventDefault();
    const text = inputs.trim();
    if (!text) {
      return;
    }
    props.onAddTask(inputs);
    setInputs("");
  }

  return (
    <>
      <form className={styles.taskForm} onSubmit={submitForm}>
        <input
          className={styles.formInput}
          onChange={(event) => setInputs(event.target.value)}
          type="text"
          value={inputs}
          ref={inputRef}
          placeholder="Name your task..."
        />
        <input className={styles.formSubmit} type="submit" value="Create" />
      </form>
    </>
  );
}
export default TaskForm;
