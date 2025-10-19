import React from "react";

function TaskItem({ task, index, completeTask, deleteTask }) {
  const styles = {
    item: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskInfo: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
    completed: {
      textDecoration: "line-through",
      color: "#888",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      margin: "2px",
      cursor: "pointer",
    },
    completeButton: {
      backgroundColor: "#cc28c6",
      color: "white",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
    },
  };

  return (
    <li style={styles.item}>
      <div style={styles.taskInfo}>
        <strong style={task.completed ? styles.completed : {}}>{task.text}</strong>
        <small>Due: {task.dueDate}</small>
      </div>
      <button
        onClick={() => completeTask(index)}
        disabled={task.completed}
        style={{ ...styles.button, ...styles.completeButton }}
      >
        {task.completed ? "Completed" : "Complete"}
      </button>
      <button
        onClick={() => deleteTask(index)}
        style={{ ...styles.button, ...styles.deleteButton }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
