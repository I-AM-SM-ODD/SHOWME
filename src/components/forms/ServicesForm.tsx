import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, DollarSign, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { Service } from '../../types';
import Mascot from '../Mascot';
import AnimatedButton from '../AnimatedButton';

interface ServicesFormProps {
  onNext: () => void;
  onBack: () => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ onNext, onBack }) => {
  const { profile, updateProfile } = useProfile();
  const [services, setServices] = useState<Service[]>(profile.services.length > 0 ? profile.services : [
    { id: '1', name: '', price: '', description: '' }
  ]);

  const addService = () => {
    setServices([...services, { id: Date.now().toString(), name: '', price: '', description: '' }]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validServices = services.filter(service => service.name.trim() && service.price.trim());
    updateProfile({ services: validServices });
    onNext();
  };

  const isValid = services.some(service => service.name.trim() && service.price.trim());

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Mascot 
          message="What services do you offer? Let's showcase your expertise! 💼" 
          emotion="excited"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Your Services</span>
            </h3>
            <motion.button
              type="button"
              onClick={addService}
              className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Service #{index + 1}</span>
                {services.length > 1 && (
                  <motion.button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Name *
                  </label>
                  <motion.input
                    type="text"
                    value={service.name}
                    onChange={(e) => updateService(service.id, 'name', e.target.value)}
                    placeholder="Web Design"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <motion.input
                      type="text"
                      value={service.price}
                      onChange={(e) => updateService(service.id, 'price', e.target.value)}
                      placeholder="500"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <motion.textarea
                  value={service.description}
                  onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  placeholder="Brief description of what this service includes..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex space-x-4">
          <AnimatedButton
            type="button"
            onClick={onBack}
            variant="secondary"
            size="lg"
            className="flex-1"
            icon={ArrowLeft}
            iconPosition="left"
          >
            Back
          </AnimatedButton>
          <AnimatedButton
            type="submit"
            disabled={!isValid}
            variant={isValid ? "primary" : "secondary"}
            size="lg"
            className="flex-1"
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue to Skills ⚡
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  );
};

export default ServicesForm;