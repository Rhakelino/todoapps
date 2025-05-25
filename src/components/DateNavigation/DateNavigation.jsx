import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { DateUtils } from '../../utils/DateUtils';

const DateNavigation = ({ selectedDate, isDarkMode, onPreviousDay, onNextDay, onToday }) => {
  const isToday = DateUtils.formatDateKey(selectedDate) === DateUtils.formatDateKey(new Date());
  
  return (
    <div className={`rounded-xl p-4 mb-4 sm:mb-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-neutral-900 border border-neutral-800' 
        : 'bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700/50'
    }`}>
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousDay}
          className={`p-2 rounded-lg transition-all ${
            isDarkMode 
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center flex-1">
          <div className={`text-lg sm:text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}>
            {DateUtils.getDayName(selectedDate)}
          </div>
          <div className={`text-xs sm:text-sm ${
            isDarkMode ? 'text-neutral-400' : 'text-gray-400'
          }`}>
            {DateUtils.formatDisplayDate(selectedDate)}
          </div>
        </div>
        
        <button
          onClick={onNextDay}
          className={`p-2 rounded-lg transition-all ${
            isDarkMode 
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Today Button */}
      {!isToday && (
        <div className="flex justify-center mt-3">
          <button
            onClick={onToday}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Kembali ke Hari Ini
          </button>
        </div>
      )}
    </div>
  );
};

export default DateNavigation;
