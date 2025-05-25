const Stats = ({ totalTasks, completedCount, isDarkMode }) => {
  if (totalTasks === 0) return null;
  
  return (
    <div className={`rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-neutral-900 border border-neutral-800' 
        : 'bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700/50'
    }`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <div className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-blue-400'
            }`}>{totalTasks}</div>
            <div className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-neutral-500' : 'text-gray-400'
            }`}>Total</div>
          </div>
          <div className="text-center">
            <div className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-green-400'
            }`}>{completedCount}</div>
            <div className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-neutral-500' : 'text-gray-400'
            }`}>Selesai</div>
          </div>
          <div className="text-center">
            <div className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-orange-400'
            }`}>{totalTasks - completedCount}</div>
            <div className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-neutral-500' : 'text-gray-400'
            }`}>Tersisa</div>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <div className={`text-xs sm:text-sm mb-1 ${
            isDarkMode ? 'text-neutral-500' : 'text-gray-400'
          }`}>Progress</div>
          <div className={`w-24 sm:w-32 rounded-full h-2 mx-auto sm:mx-0 ${
            isDarkMode ? 'bg-neutral-800' : 'bg-gray-700'
          }`}>
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-sm'
              }`}
              style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
            ></div>
          </div>
          <div className={`text-xs mt-1 ${
            isDarkMode ? 'text-neutral-500' : 'text-gray-400'
          }`}>
            {totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;