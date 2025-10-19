import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ConfettiCanvas from "./ConfettiCanvas";

function App() {
  const [tasks, setTasks] = useState([]);
  const [background, setBackground] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  // Load tasks and background from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    const storedBackground = localStorage.getItem("background");
    if (storedBackground) setBackground(storedBackground);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handlers
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    setConfettiTrigger(true); // trigger confetti
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleBackgroundUpload = (imgUrl) => {
    setBackground(imgUrl);
    localStorage.setItem("background", imgUrl);
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      position: "relative",
    },
    container: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "350px",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    },
    backgroundImage: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      objectFit: "cover",
      opacity: 0.6,
    },
  };

  return (
    <div style={styles.body}>
      {background && (
        <img src={background} alt="Background" style={styles.backgroundImage} />
      )}
      <div style={styles.container}>
        <h1>Task Tracker</h1>
        <TaskForm addTask={addTask} handleBackgroundUpload={handleBackgroundUpload} />
        <TaskList
          tasks={tasks}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      </div>
      <ConfettiCanvas trigger={confettiTrigger} resetTrigger={() => setConfettiTrigger(false)} />
    </div>
  );
}

export default App;
