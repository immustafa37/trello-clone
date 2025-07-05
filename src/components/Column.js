import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ columnId, title, tasks, updateTask, deleteTask }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;