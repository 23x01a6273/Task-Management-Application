import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          className="p-1 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-500" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-64 lg:w-96 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-700/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="Search tasks, teams, or projects..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <button className="hidden sm:block p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        <button className="hidden sm:block p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.jobTitle || 'Team Member'}</p>
          </div>
          <img
            className="w-8 h-8 rounded-full ring-2 ring-primary-500"
            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
