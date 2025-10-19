import React, { useState } from "react";

function TaskForm({ addTask, handleBackgroundUpload }) {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask || !dueDate) return;

    addTask({ text: newTask, dueDate, completed: false });
    setNewTask("");
    setDueDate("");
  };

  const styles = {
    input: {
      padding: "10px",
      width: "200px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      margin: "5px",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      backgroundColor: "#cc28c6",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      margin: "2px",
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          required
          style={styles.input}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (event) => handleBackgroundUpload(event.target.result);
          reader.readAsDataURL(file);
        }}
      />
    </>
  );
}

export default TaskForm;
