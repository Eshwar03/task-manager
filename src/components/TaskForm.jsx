import { useState, useRef, useEffect } from "react";
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
      <form onSubmit={submitForm}>
        <input
          onChange={(event) => setInputs(event.target.value)}
          type="text"
          value={inputs}
          ref={inputRef}
        />
        <input type="submit" value="Add" />
      </form>
    </>
  );
}
export default TaskForm;
