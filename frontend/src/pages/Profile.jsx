import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Briefcase, 
  Building2, 
  Camera,
  Save,
  Loader2,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    jobTitle: user?.jobTitle || '',
    department: user?.department || '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      delete updateData.confirmPassword;

      await updateProfile(updateData);
      toast.success('Profile updated successfully!');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your profile, security, and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary-600" />
              <h2 className="font-bold text-gray-900 dark:text-white">Profile Information</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-700/50">
                <div className="relative group">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-50 dark:ring-gray-700"
                  />
                  <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g. Senior Project Manager"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g. Product Operations"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-red-50 dark:border-red-900/20 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-gray-900 dark:text-white">Security</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Current Password</label>
                  <input type="password" underline className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg outline-none" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg outline-none" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
                  Update Password
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Password Requirements</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-green-600"><CheckCircle2 className="w-3 h-3" /> Minimum 8 characters</li>
                  <li className="flex items-center gap-2 text-xs text-green-600"><CheckCircle2 className="w-3 h-3" /> One uppercase letter</li>
                  <li className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 rounded-full border border-gray-300" /> One numeric digit</li>
                  <li className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 rounded-full border border-gray-300" /> One special character</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Preferences */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Appearance</p>
                  <p className="text-xs text-gray-500">Switch between light and dark modes.</p>
                </div>
                <div className="w-10 h-6 bg-primary-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-4 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-xs text-gray-500">Weekly task summaries and alerts.</p>
                </div>
                <div className="w-10 h-6 bg-primary-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-4 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Desktop Sounds</p>
                  <p className="text-xs text-gray-500">Play audio for task completions.</p>
                </div>
                <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-600 p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
            <h3 className="font-bold mb-2">Two-Factor Authentication</h3>
            <p className="text-xs text-primary-100 mb-4">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
            <button className="w-full py-2 bg-white text-primary-600 rounded-lg text-sm font-bold hover:bg-primary-50 transition-colors">
              Enable 2FA
            </button>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 px-2">
            <span>Last active: Today at 14:32 PM</span>
            <button className="text-red-500 font-bold hover:underline">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
