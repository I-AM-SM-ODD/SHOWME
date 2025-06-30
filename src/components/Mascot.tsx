import React from 'react';
import { motion } from 'framer-motion';

interface MascotProps {
  message?: string;
  emotion?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'sm' | 'md' | 'lg';
}

const Mascot: React.FC<MascotProps> = ({ 
  message, 
  emotion = 'happy', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const getEmoji = () => {
    switch (emotion) {
      case 'excited': return '🤩';
      case 'thinking': return '🤔';
      case 'celebrating': return '🎉';
      default: return '😊';
    }
  };

  const getAnimation = () => {
    switch (emotion) {
      case 'excited': return { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] };
      case 'thinking': return { rotate: [-5, 5, -5] };
      case 'celebrating': return { y: [0, -10, 0], scale: [1, 1.2, 1] };
      default: return { y: [0, -5, 0] };
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-4xl shadow-lg`}
        animate={getAnimation()}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {getEmoji()}
      </motion.div>
      
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-lg max-w-xs text-center relative"
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45"></div>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {message}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Mascot;