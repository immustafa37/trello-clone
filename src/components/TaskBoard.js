import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  todo: {
    title: "To Do",
    tasks: [
      { id: "1", content: "Learn React" },
      { id: "2", content: "Watch tutorial" },
    ],
  },
  doing: {
    title: "Doing",
    tasks: [{ id: "3", content: "Make a Trello Clone" }],
  },
  done: {
    title: "Done",
    tasks: [{ id: "4", content: "Install dependencies" }],
  },
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {Object.entries(columns).map(([key, data]) => (
          <Column key={key} droppableId={key} title={data.title} tasks={data.tasks} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;