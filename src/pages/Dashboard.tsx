import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Eye, Edit, Share2, BarChart3, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import InvoiceGenerator from '../components/InvoiceGenerator';
import AnimatedButton from '../components/AnimatedButton';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const stats = [
    { label: 'Portfolio Views', value: '1,234', change: '+12%', color: 'text-blue-600' },
    { label: 'Profile Shares', value: '89', change: '+5%', color: 'text-green-600' },
    { label: 'Contact Clicks', value: '156', change: '+18%', color: 'text-purple-600' },
    { label: 'Invoices Sent', value: '23', change: '+8%', color: 'text-orange-600' },
  ];

  const quickActions = [
    {
      title: 'Create New Portfolio',
      description: 'Build a fresh portfolio from scratch',
      icon: <Plus className="w-6 h-6" />,
      link: '/create',
      color: 'bg-primary-500',
      variant: 'primary' as const
    },
    {
      title: 'View My Portfolio',
      description: 'See how your portfolio looks to visitors',
      icon: <Eye className="w-6 h-6" />,
      link: `/portfolio/${user?.username || 'demo'}`,
      color: 'bg-green-500',
      variant: 'success' as const
    },
    {
      title: 'Edit Portfolio',
      description: 'Update your existing portfolio',
      icon: <Edit className="w-6 h-6" />,
      link: '/create',
      color: 'bg-blue-500',
      variant: 'primary' as const
    },
    {
      title: 'Share Portfolio',
      description: 'Get shareable links and QR codes',
      icon: <Share2 className="w-6 h-6" />,
      action: () => navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user?.username || 'demo'}`),
      color: 'bg-purple-500',
      variant: 'primary' as const
    },
    {
      title: 'Send Invoice',
      description: 'Create and send professional invoices',
      icon: <FileText className="w-6 h-6" />,
      action: () => setShowInvoiceModal(true),
      color: 'bg-orange-500',
      variant: 'warning' as const
    },
    {
      title: 'View Analytics',
      description: 'Track your portfolio performance',
      icon: <BarChart3 className="w-6 h-6" />,
      link: '/analytics',
      color: 'bg-pink-500',
      variant: 'primary' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ShowMe</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </motion.div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              <motion.button
                onClick={signOut}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your portfolio today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <motion.div 
                  className={`text-sm font-medium ${stat.color}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.change}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <motion.h2 
            className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Quick Actions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                onClick={action.action}
              >
                {action.link ? (
                  <Link to={action.link} className="block">
                    <motion.div 
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {action.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {action.description}
                    </p>
                  </Link>
                ) : (
                  <>
                    <motion.div 
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {action.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {action.description}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { color: 'bg-green-500', text: 'Portfolio viewed by visitor from New York', time: '2 hours ago' },
              { color: 'bg-blue-500', text: 'Contact form submitted', time: '5 hours ago' },
              { color: 'bg-purple-500', text: 'Portfolio shared on LinkedIn', time: '1 day ago' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className={`w-2 h-2 ${activity.color} rounded-full`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{activity.text}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <InvoiceGenerator 
        isOpen={showInvoiceModal} 
        onClose={() => setShowInvoiceModal(false)} 
      />
    </div>
  );
};

export default Dashboard;