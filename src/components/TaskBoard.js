import React, { useEffect, useState } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import SearchBar from "./SearchBar";
import ProgressStats from "./ProgressStats";
import { DragDropContext } from "react-beautiful-dnd";
import { toast } from "react-toastify";

const initialData = {
  todo: [],
  doing: [],
  done: []
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("task-columns");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("task-columns", JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = [...columns[source.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);
    const destinationList = [...columns[destination.droppableId]];
    destinationList.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList
    });
  };

  const addTask = (newTask) => {
    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));
    toast.success("Task added successfully!");
  };

  const updateTask = (columnId, taskId, updatedTask) => {
    const updated = columns[columnId].map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setColumns({ ...columns, [columnId]: updated });
    toast.success("Task updated.");
  };

  const deleteTask = (columnId, taskId) => {
    const filtered = columns[columnId].filter((task) => task.id !== taskId);
    setColumns({ ...columns, [columnId]: filtered });
    toast.info("Task deleted.");
  };

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <ProgressStats columns={columns} />
      <button style={{ margin: "10px 0" }} onClick={() => setIsModalOpen(true)}>
        ➕ Add Task
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([key, tasks]) => (
            <Column
              key={key}
              columnId={key}
              title={key.toUpperCase()}
              tasks={tasks.filter((t) =>
                t.title.toLowerCase().includes(search.toLowerCase())
              )}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;