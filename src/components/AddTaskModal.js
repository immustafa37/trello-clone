import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: uuidv4(),
      title,
      description,
      dueDate: dueDate.toLocaleDateString(),
      priority
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Task</h3>
          <button onClick={onClose}>❌</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Due Date:</label>
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;