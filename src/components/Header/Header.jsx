import { List, Moon, Sun } from 'lucide-react';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4 relative">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`absolute left-0 p-2 rounded-full transition-all duration-300 ${isDarkMode
            ? 'bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800'
            : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 shadow-lg'
            }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className={`p-2 sm:p-3 rounded-full shadow-lg ${isDarkMode
          ? 'bg-neutral-900 border border-neutral-800'
          : 'bg-gradient-to-r from-purple-600 to-blue-600'
          }`}>
          <List className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>
      <h1 className={`text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 ${isDarkMode
        ? 'text-white'
        : 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
        }`}>
        Schedly
      </h1>
      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-gray-400'
        }`}>
        Plan your day, achieve your dreams
      </p>
    </div>
  );
};

export default Header;
