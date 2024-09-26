import React, { useState } from "react";
import "./Box.css";

function Box() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTask, setCompletedTask] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showTask, setShowTask] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const handleClear = () => {
    setTasks([]);
    setCompletedTask([]);
  };

  const removeTask = (index) => {
    setCompletedTask([...completedTask, tasks[index]]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addTask = (index) => {
    setTasks([...tasks, completedTask[index]]);
    setCompletedTask(completedTask.filter((_, i) => i !== index));
  };

  const handleShow = (e) => {
    const value = e.target.value;
    if (value === "completed") {
      setShowCompleted(true);
      setShowTask(false);
    } else if (value === "active") {
      setShowCompleted(false);
      setShowTask(true);
    } else {
      setShowCompleted(true);
      setShowTask(true);
    }
  };
  return (
    <div className="box">
      <div className="add_task">
        <form onSubmit={handleSubmit}>
          <h1>ToDo</h1>
          <input
            type="text"
            placeholder="  New Todo"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="add_btn">
            ADD
          </button>
        </form>
      </div>
      <div className="list_task">
        <ul>
          {tasks.length > 0 && showTask
            ? tasks.map((task, index) => (
                <li
                  key={index}
                  className="list_item"
                  onClick={() => removeTask(index)}
                >
                  {task}
                </li>
              ))
            : null}
          {completedTask.length > 0 && showCompleted
            ? completedTask.map((completed, index) => (
                <li
                  key={index}
                  className="completed_list_item"
                  onClick={() => addTask(index)}
                >
                  {completed}
                </li>
              ))
            : null}

          {tasks.length === 0 && completedTask.length === 0 && <p>No tasks</p>}
        </ul>
      </div>
      <div className="footer">
        <button className="clear_btn" onClick={handleClear}>
          Clear
        </button>
        <div>
          <label htmlFor="show">Show: </label>
          <select name="show" className="show" onChange={handleShow}>
            <option value="all"> All</option>
            <option value="active"> Active</option>
            <option value="completed"> Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Box;
