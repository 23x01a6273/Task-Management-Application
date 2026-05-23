import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import API from '../services/api';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import TaskForm from '../components/tasks/TaskForm';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Filter & Pagination State
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/tasks`, {
        params: { search, priority, status, sort, page, limit: 8 }
      });
      setTasks(data.tasks);
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timeout);
  }, [search, priority, status, sort, page]);

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      toast.success(`Task marked as ${newStatus}`);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your project progress</p>
        </div>
        <button 
          onClick={() => { setSelectedTask(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select 
            className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Sort by Date (Newest)</option>
            <option value="oldest">Sort by Date (Oldest)</option>
            <option value="dueSoon">Sort by Due Date</option>
          </select>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden lg:block" />

          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4">Task Title</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">Loading tasks...</td></tr>
              ) : tasks.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No tasks found</td></tr>
              ) : tasks.map((task) => (
                <tr key={task._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold text-gray-900 dark:text-white ${task.status === 'Completed' ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.tags?.[0] || 'General'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      task.priority === 'High' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                      'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
                    }`}>
                      <span className={`w-1 h-1 rounded-full mr-1.5 ${
                        task.priority === 'High' ? 'bg-red-500' : 
                        task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      task.status === 'On Hold' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' :
                      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                      {new Date(task.dueDate) < new Date() && task.status !== 'Completed' && (
                        <span className="text-[10px] font-bold text-red-500 uppercase">Overdue</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleComplete(task)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-400'}`}
                        title="Toggle Complete"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => { setSelectedTask(task); setShowModal(true); }}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit Task"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Task"
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{(page - 1) * 8 + 1}</span> to <span className="font-medium">{Math.min(page * 8, total)}</span> of <span className="font-medium">{total}</span> tasks
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 text-sm font-medium rounded-md ${
                  page === i + 1 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setPage(p => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="p-1 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TaskForm 
          task={selectedTask} 
          onClose={() => setShowModal(false)} 
          onSuccess={() => { setShowModal(false); fetchTasks(); }} 
        />
      )}
    </div>
  );
};

export default Tasks;
