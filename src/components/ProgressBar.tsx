import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {index < currentStep ? (
                <Check size={16} />
              ) : (
                index + 1
              )}
            </motion.div>
            <span className={`text-xs text-center ${
              index <= currentStep 
                ? 'text-gray-900 dark:text-white font-medium' 
                : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;