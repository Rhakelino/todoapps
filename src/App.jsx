import { useRef } from 'react';
import Header from './components/Header/Header';
import DateNavigation from './components/DateNavigation/DateNavigation';
import Stats from './components/Stats/Stats';
import AddTaskInput from './components/AddTaskInput/AddTaskInput';
import TaskList from './components/TaskList/TaskList';
import { useTodoLogic } from './hooks/useTodoLogic';

function App() {
  const inputRef = useRef(null);
  const {
    // State
    isDarkMode,
    selectedDate,
    editingIndex,
    editValue,
    setEditValue,

    // Derived state
    currentTasks,
    currentCompletedTasks,

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
  } = useTodoLogic();

  const completedCount = currentCompletedTasks.filter(Boolean).length;
  const totalTasks = currentTasks.length;

  // Handle add task
  const handleAddTask = () => {
    const success = addTask(inputRef.current.value);
    if (success) {
      inputRef.current.value = "";
    } else {
      alert("Input tidak boleh kosong");
    }
  };

  // Handle save edit
  const handleSaveEdit = (index) => {
    const success = saveEdit(index);
    if (!success) {
      alert("Tugas tidak boleh kosong");
    }
  };

  // Handle key down
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      handleSaveEdit(index);
    }
  };

  return (
    <div className={`min-h-screen px-3 py-4 sm:p-4 transition-colors duration-300 ${isDarkMode
      ? 'bg-black'
      : 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800'
      }`}>
      <div className="max-w-2xl mx-auto">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <DateNavigation
          selectedDate={selectedDate}
          isDarkMode={isDarkMode}
          onPreviousDay={goToPreviousDay}
          onNextDay={goToNextDay}
          onToday={goToToday}
        />

        <Stats
          totalTasks={totalTasks}
          completedCount={completedCount}
          isDarkMode={isDarkMode}
        />
        <AddTaskInput
          selectedDate={selectedDate}
          isDarkMode={isDarkMode}
          onAddTask={handleAddTask}
          inputRef={inputRef}
        />
        <TaskList
          tasks={currentTasks}
          completedTasks={currentCompletedTasks}
          selectedDate={selectedDate}
          editingIndex={editingIndex}
          editValue={editValue}
          isDarkMode={isDarkMode}
          onToggleComplete={toggleTaskComplete}
          onStartEdit={startEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={cancelEdit}
          onDelete={deleteTask}
          onEditValueChange={setEditValue}
          onKeyDown={handleKeyDown}
        />

        {/* Footer */}
        {totalTasks > 0 && (
          <div className={`text-center mt-6 sm:mt-8 text-xs sm:text-sm px-4 ${isDarkMode ? 'text-neutral-600' : 'text-gray-500'
            }`}>
            Click on tasks to mark them as complete
          </div>
        )}
      </div>
    </div>
  );
}

export default App;