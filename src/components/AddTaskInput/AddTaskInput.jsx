import { Plus } from 'lucide-react';
import { DateUtils } from '../../utils/DateUtils';

const AddTaskInput = ({ selectedDate, isDarkMode, onAddTask, inputRef }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <div className={`rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-neutral-900 border border-neutral-800' 
        : 'bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700/50'
    }`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base transition-all ${
            isDarkMode 
              ? 'bg-neutral-800 border border-neutral-700 focus:ring-white focus:border-transparent placeholder-neutral-500 text-white'
              : 'bg-gray-700/50 border border-gray-600 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-100'
          }`}
          placeholder={`Apa yang perlu dilakukan ${DateUtils.getDayName(selectedDate).toLowerCase()}?`}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button
          type="button"
          className={`px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
            isDarkMode 
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
          }`}
          onClick={onAddTask}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddTaskInput;
