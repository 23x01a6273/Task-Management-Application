import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  BarChart3, 
  Users,
  Layers,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary-600 rounded-lg">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">TaskFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Resources</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600">Log in</Link>
          <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-current" />
            Efficiency Redefined
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Orchestrate Your <span className="text-primary-600">Workflow</span> With Absolute Precision
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
            TaskFlow is the minimalist management suite designed for high-velocity teams who value clarity over clutter. Manage complex projects with a systematic, data-driven approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-primary-500/25 flex items-center justify-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              View Demo
            </button>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900" src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
              ))}
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold border-4 border-white dark:border-gray-900">+12</div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Trusted by 10,000+ teams worldwide</p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full" />
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Dashboard Preview" 
              className="rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Team Velocity</p>
                <p className="text-xl font-black text-gray-900 dark:text-white">+24.8%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 dark:bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Precision Features</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A suite of tools engineered for the modern professional, focusing on functional density and cognitive clarity.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-time Updates</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Stay perfectly synced with your team. Every task status, comment, and document edit propagates instantly across all connected devices.
            </p>
          </div>
          <div className="bg-primary-600 p-8 rounded-2xl shadow-xl text-white md:row-span-2 flex flex-col justify-between overflow-hidden relative">
            <Users className="absolute -right-8 -top-8 w-48 h-48 opacity-10" />
            <div>
              <div className="p-3 bg-white/20 rounded-xl w-fit mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
              <p className="text-primary-50 text-sm leading-relaxed mb-8">
                Contextual communication built directly into your workflow. Remove the noise of external chat apps and keep conversations where they matter most: inside the task.
              </p>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-8 h-8 rounded-full border-2 border-primary-600" src={`https://i.pravatar.cc/100?u=${i+10}`} alt="" />
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Visualize productivity bottlenecks with automated reporting and burndown charts that provide actionable insights.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-xl transition-all group">
            <div className="p-3 bg-white dark:bg-gray-800 text-blue-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              SOC2 Type II compliant infrastructure with end-to-end encryption. Your data is isolated, protected, and entirely yours.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Deep Integrations</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Connect with your existing tech stack effortlessly. GitHub, Slack, Jira, and Figma work in harmony with TaskFlow.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-600 rounded-lg">
                <Zap className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-lg font-bold text-primary-600">TaskFlow</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The systematic management suite for professional teams who value efficiency and clarity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-primary-600">Features</a></li>
              <li><a href="#" className="hover:text-primary-600">Integrations</a></li>
              <li><a href="#" className="hover:text-primary-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-900 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-primary-600">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-primary-600">Support</a></li>
              <li><a href="#" className="hover:text-primary-600">Sales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
          <p className="text-[10px] text-gray-400">© 2026 TaskFlow Management Suite. All rights reserved.</p>
          <div className="flex gap-6 text-[10px] text-gray-400">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
