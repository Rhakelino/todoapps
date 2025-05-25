import { Trash2, Edit3, CheckCircle2, Circle } from 'lucide-react';

const TaskItem = ({ 
  task, 
  index, 
  isCompleted, 
  isEditing, 
  editValue, 
  isDarkMode,
  onToggleComplete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditValueChange,
  onKeyDown
}) => {
  return (
    <div className={`rounded-xl p-3 sm:p-4 transition-all duration-200 ${
      isDarkMode 
        ? `bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 ${isCompleted ? 'opacity-50' : ''}`
        : `bg-gray-800/40 backdrop-blur-sm shadow-lg border border-gray-700/50 hover:shadow-xl hover:bg-gray-800/60 ${isCompleted ? 'opacity-60' : ''}`
    }`}>
      <div className="flex items-center gap-3 sm:gap-4">
        {isEditing ? (
          <>
            <input
              type="text"
              className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                isDarkMode 
                  ? 'bg-neutral-800 border border-neutral-700 focus:ring-white focus:border-transparent text-white'
                  : 'bg-gray-700/50 border border-gray-600 focus:ring-purple-500 focus:border-transparent text-gray-100'
              }`}
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
              onKeyDown={(e) => onKeyDown(e, index)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium rounded-lg transition-colors text-xs sm:text-sm ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                }`}
                onClick={() => onSaveEdit(index)}
              >
                Save
              </button>
              <button
                className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium rounded-lg transition-colors text-xs sm:text-sm ${
                  isDarkMode 
                    ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                    : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md'
                }`}
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Checkbox */}
            <button
              onClick={() => onToggleComplete(index)}
              className="flex-shrink-0 transition-colors p-1"
            >
              {isCompleted ? (
                <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isDarkMode ? 'text-white' : 'text-green-400'
                }`} />
              ) : (
                <Circle className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isDarkMode ? 'text-neutral-600 hover:text-neutral-400' : 'text-gray-500 hover:text-gray-400'
                }`} />
              )}
            </button>

            {/* Task Text */}
            <div
              className={`flex-1 font-medium cursor-pointer transition-all text-sm sm:text-base leading-relaxed ${
                isCompleted
                  ? (isDarkMode ? 'line-through text-neutral-600' : 'line-through text-gray-500')
                  : (isDarkMode ? 'text-white hover:text-neutral-200' : 'text-gray-200 hover:text-white')
              }`}
              onClick={() => onToggleComplete(index)}
            >
              {task}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => onStartEdit(task, index)}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'text-neutral-600 hover:text-white hover:bg-neutral-800'
                    : 'text-gray-500 hover:text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'text-neutral-600 hover:text-white hover:bg-neutral-800'
                    : 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;