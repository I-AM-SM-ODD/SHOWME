import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  href,
  target,
  rel
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 focus:ring-green-500 shadow-lg hover:shadow-xl',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500 shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-500 shadow-lg hover:shadow-xl'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${className}`;

  const buttonContent = (
    <>
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Button content */}
      <motion.div
        className="flex items-center space-x-2 relative z-10"
        initial={false}
        animate={{ opacity: loading ? 0.5 : 1 }}
      >
        {Icon && iconPosition === 'left' && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
      </motion.div>
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { 
      scale: 1.02,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    whileTap: disabled ? {} : { 
      scale: 0.98,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;