import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskCard = ({ task, index, columnId, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    updateTask(columnId, task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <div>
              <input
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
              <button onClick={handleEdit}>Save</button>
            </div>
          ) : (
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>
                Due: {task.dueDate} | Priority: {task.priority}
              </small>
            </div>
          )}
          <div className="task-actions">
            <FaEdit onClick={() => setIsEditing(!isEditing)} />
            <FaTrash onClick={() => deleteTask(columnId, task.id)} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;