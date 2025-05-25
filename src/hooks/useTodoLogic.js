import { useState, useEffect } from 'react';
import { DateUtils } from '../utils/DateUtils';

export const useTodoLogic = () => {
  const [tasks, setTasks] = useState({});
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTask, setCompletedTask] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current date tasks
  const getCurrentTasks = () => {
    const dateKey = DateUtils.formatDateKey(selectedDate);
    return tasks[dateKey] || [];
  };

  // Get current date completed tasks
  const getCurrentCompletedTasks = () => {
    const dateKey = DateUtils.formatDateKey(selectedDate);
    return completedTask[dateKey] || [];
  };

  // Add task
  const addTask = (newTask) => {
    if (newTask.trim()) {
      const dateKey = DateUtils.formatDateKey(selectedDate);
      const currentTasks = tasks[dateKey] || [];
      const currentCompleted = completedTask[dateKey] || [];
      
      const updatedTasks = [...currentTasks, newTask.trim()];
      const updatedCompletedTask = [...currentCompleted, false];
      
      const newTasksState = { ...tasks, [dateKey]: updatedTasks };
      const newCompletedState = { ...completedTask, [dateKey]: updatedCompletedTask };
      
      setTasks(newTasksState);
      setCompletedTask(newCompletedState);
      localStorage.setItem("tasks", JSON.stringify(newTasksState));
      localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
      return true;
    }
    return false;
  };

  // Delete task
  const deleteTask = (index) => {
    const dateKey = DateUtils.formatDateKey(selectedDate);
    const currentTasks = tasks[dateKey] || [];
    const currentCompleted = completedTask[dateKey] || [];
    
    const updatedTasks = currentTasks.filter((_, i) => i !== index);
    const updatedCompletedTask = currentCompleted.filter((_, i) => i !== index);
    
    const newTasksState = { ...tasks, [dateKey]: updatedTasks };
    const newCompletedState = { ...completedTask, [dateKey]: updatedCompletedTask };
    
    setTasks(newTasksState);
    setCompletedTask(newCompletedState);
    localStorage.setItem("tasks", JSON.stringify(newTasksState));
    localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
  };

  // Start editing
  const startEdit = (task, index) => {
    setEditingIndex(index);
    setEditValue(task);
  };

  // Save edit
  const saveEdit = (index) => {
    if (editValue.trim() === "") {
      return false;
    }

    const dateKey = DateUtils.formatDateKey(selectedDate);
    const currentTasks = tasks[dateKey] || [];
    const updatedTasks = currentTasks.map((task, i) => (i === index ? editValue.trim() : task));
    
    const newTasksState = { ...tasks, [dateKey]: updatedTasks };
    setTasks(newTasksState);
    localStorage.setItem("tasks", JSON.stringify(newTasksState));
    setEditingIndex(null);
    setEditValue("");
    return true;
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  // Toggle task completion
  const toggleTaskComplete = (index) => {
    const dateKey = DateUtils.formatDateKey(selectedDate);
    const currentCompleted = completedTask[dateKey] || [];
    const updatedCompletedTask = currentCompleted.map((completed, i) =>
      i === index ? !completed : completed
    );
    
    const newCompletedState = { ...completedTask, [dateKey]: updatedCompletedTask };
    setCompletedTask(newCompletedState);
    localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  // Navigation functions
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Load data on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    const savedCompletedTask = JSON.parse(localStorage.getItem("completedTask")) || {};
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    setTasks(savedTasks);
    setCompletedTask(savedCompletedTask);
    setIsDarkMode(savedDarkMode);
  }, []);

  return {
    // State
    isDarkMode,
    selectedDate,
    editingIndex,
    editValue,
    setEditValue,
    
    // Derived state
    currentTasks: getCurrentTasks(),
    currentCompletedTasks: getCurrentCompletedTasks(),
    
    // Actions
    addTask,
    deleteTask,
    startEdit,
    saveEdit,
    cancelEdit,
    toggleTaskComplete,
    toggleDarkMode,
    goToPreviousDay,
    goToNextDay,
    goToToday
  };
};