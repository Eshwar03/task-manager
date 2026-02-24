import { useState } from "react";
function TaskForm(props) {
  const [inputs, setInputs] = useState("");

  function submitForm(e) {
    e.preventDefault();
    const text = inputs.trim();
    if (!text) {
      return;
    }
    props.onAddTask.addTask(inputs);
    setInputs("");
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          onChange={(event) => setInputs(event.target.value)}
          type="text"
          value={inputs}
        />
        <input type="submit" />
      </form>
    </>
  );
}
export default TaskForm;
