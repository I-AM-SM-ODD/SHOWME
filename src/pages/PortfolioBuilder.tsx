import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '../components/WelcomeScreen';
import BasicInfoForm from '../components/forms/BasicInfoForm';
import ServicesForm from '../components/forms/ServicesForm';
import SkillsForm from '../components/forms/SkillsForm';
import ContactForm from '../components/forms/ContactForm';
import Portfolio from '../components/Portfolio';
import ProgressBar from '../components/ProgressBar';

const PortfolioBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Welcome',
    'Basic Info',
    'Services',
    'Skills',
    'Contact',
    'Portfolio'
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleBackToBuilder = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="pt-8">
          <ProgressBar 
            currentStep={currentStep - 1} 
            totalSteps={steps.length - 2} 
            steps={steps.slice(1, -1)} 
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        
        {currentStep === 1 && (
          <BasicInfoForm key="basic-info" onNext={handleNext} />
        )}
        
        {currentStep === 2 && (
          <ServicesForm key="services" onNext={handleNext} onBack={handleBack} />
        )}
        
        {currentStep === 3 && (
          <SkillsForm key="skills" onNext={handleNext} onBack={handleBack} />
        )}
        
        {currentStep === 4 && (
          <ContactForm key="contact" onNext={handleNext} onBack={handleBack} />
        )}
        
        {currentStep === 5 && (
          <Portfolio key="portfolio" onBack={handleBackToBuilder} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioBuilder;