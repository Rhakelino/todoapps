import { useState, useEffect } from 'react';
import { DateUtils } from '../utils/DateUtils';

export const useTodoLogic = () => {
  // Initialize selectedDate with normalized date
  const [tasks, setTasks] = useState({});
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTask, setCompletedTask] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

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
      
      // Ensure persistent storage
      try {
        localStorage.setItem("tasks", JSON.stringify(newTasksState));
        localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
      } catch (error) {
        console.error("Error saving tasks to localStorage", error);
      }
      
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
    
    try {
      localStorage.setItem("tasks", JSON.stringify(newTasksState));
      localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
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
    
    try {
      localStorage.setItem("tasks", JSON.stringify(newTasksState));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
    
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
    
    try {
      localStorage.setItem("completedTask", JSON.stringify(newCompletedState));
    } catch (error) {
      console.error("Error saving completed tasks to localStorage", error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    try {
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    } catch (error) {
      console.error("Error saving dark mode preference", error);
    }
  };

  // Navigation functions
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    previousDay.setHours(0, 0, 0, 0);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  };

  // Load data on mount
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
      const savedCompletedTask = JSON.parse(localStorage.getItem("completedTask")) || {};
      const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
      
      setTasks(savedTasks);
      setCompletedTask(savedCompletedTask);
      setIsDarkMode(savedDarkMode);
    } catch (error) {
      console.error("Error loading data from localStorage", error);
    }
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