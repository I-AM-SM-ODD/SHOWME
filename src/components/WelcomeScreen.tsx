import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Mascot from './Mascot';
import AnimatedButton from './AnimatedButton';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Mascot 
            message="Hey there! Ready to create an amazing portfolio? ✨" 
            emotion="excited"
            size="lg"
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              ShowMe
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create a stunning portfolio in minutes and start attracting your dream clients! 🚀
          </p>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-300">Professional portfolio in minutes</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
            >
              <Sparkles className="w-5 h-5 text-secondary-500" />
              <span className="text-gray-700 dark:text-gray-300">Easy sharing with QR codes</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-300">Built-in invoice generator</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatedButton
            onClick={onStart}
            variant="primary"
            size="lg"
            className="w-full"
            icon={ArrowRight}
            iconPosition="right"
          >
            Let's Get Started
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;