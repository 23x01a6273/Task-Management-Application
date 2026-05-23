import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Plus,
  ArrowRight,
  MoreVertical,
  Zap
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    highPriority: 0,
    dueSoon: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          API.get('/tasks/stats'),
          API.get('/tasks?limit=3&sort=newest')
        ]);
        setStats(statsRes.data);
        setRecentTasks(tasksRes.data.tasks);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Total Tasks', value: stats.totalTasks, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12%' },
    { label: 'Completed', value: stats.completedTasks, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', trend: '82% Comp.' },
    { label: 'Due Soon', value: stats.dueSoon, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', trend: 'Critical' },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back, {user?.name.split(' ')[0]}.</h1>
        <p className="text-gray-500 dark:text-gray-400">You have {stats.highPriority} high-priority tasks due before EOD.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-semibold ${stat.color}`}>{stat.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Tasks</h2>
            <button className="text-sm text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <tr>
                  <th className="px-6 py-4">Task Details</th>
                  <th className="px-6 py-4">Assignee</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Project: {task.tags?.[0] || 'General'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src={user?.avatar} alt="" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          task.priority === 'High' ? 'bg-red-500' : 
                          task.priority === 'Medium' ? 'bg-blue-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{task.priority}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity & Productivity */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < 2 && <div className="absolute left-4 top-8 w-0.5 h-10 bg-gray-100 dark:bg-gray-700" />}
                  <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 0 ? 'bg-blue-50 text-blue-600' : 
                    i === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">Sarah Miller</span> updated the status of <span className="text-primary-600">User Research Docs</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
              Load more activity
            </button>
          </div>

          <div className="bg-primary-600 p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-primary-500 opacity-20 rotate-12" />
            <h3 className="text-lg font-bold mb-2">Productivity Tip</h3>
            <p className="text-sm text-primary-100">Focus on "Finalize Q3 Design System" today. Research shows completing deep work in the morning boosts total daily output by 20%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
