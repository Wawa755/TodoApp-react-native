import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodoStore = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  //adding new todos
  const addTask = (title, description, date) => {
    if (!title.trim()) return alert("Task title can't be empty!");
    const newTask = { title, description: description.trim() || "/", date: new Date(date).toISOString(), status: "incomplete" };
    setTodoList(prev => [...prev, newTask]);
  };

  //updating todo status
  const updateTaskStatus = (index) => {
    setTodoList(prev => {
      const updatedList = [...prev];
      let task = updatedList[index];
      task.status = task.status === "incomplete" ? "complete" : "incomplete";
      task.completedAt = task.status === "complete" ? new Date().toISOString() : null;
      return updatedList;
    });
  };

  return <TodoContext.Provider value={{ todoList, addTask, updateTaskStatus }}>{children}</TodoContext.Provider>;
};
