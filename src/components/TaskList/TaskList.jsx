import { List } from 'lucide-react';
import TaskItem from '../TaskItem/TaskItem';
import { DateUtils } from '../../utils/DateUtils';

const TaskList = ({ 
  tasks, 
  completedTasks, 
  selectedDate, 
  editingIndex, 
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
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
          isDarkMode 
            ? 'bg-neutral-900 border border-neutral-800' 
            : 'bg-gray-700/50'
        }`}>
          <List className={`w-6 h-6 sm:w-8 sm:h-8 ${
            isDarkMode ? 'text-neutral-600' : 'text-gray-500'
          }`} />
        </div>
        <h3 className={`text-base sm:text-lg font-medium mb-1 sm:mb-2 ${
          isDarkMode ? 'text-neutral-400' : 'text-gray-400'
        }`}>Tidak Ada Kegiatan {DateUtils.getDayName(selectedDate).toLowerCase()}</h3>
        <p className={`text-sm sm:text-base ${
          isDarkMode ? 'text-neutral-600' : 'text-gray-500'
        }`}>Tambahkan tugas pertama untuk memulai!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {tasks.map((task, i) => (
        <TaskItem
          key={i}
          task={task}
          index={i}
          isCompleted={completedTasks[i] || false}
          isEditing={editingIndex === i}
          editValue={editValue}
          isDarkMode={isDarkMode}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
          onEditValueChange={onEditValueChange}
          onKeyDown={onKeyDown}
        />
      ))}
    </div>
  );
};

export default TaskList;
