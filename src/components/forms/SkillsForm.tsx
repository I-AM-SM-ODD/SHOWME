import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import Mascot from '../Mascot';
import AnimatedButton from '../AnimatedButton';

interface SkillsFormProps {
  onNext: () => void;
  onBack: () => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ onNext, onBack }) => {
  const { profile, updateProfile } = useProfile();
  const [skills, setSkills] = useState<string[]>(profile.skills.length > 0 ? profile.skills : ['']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validSkills = skills.filter(skill => skill.trim());
    updateProfile({ skills: validSkills });
    onNext();
  };

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Design', 'Figma',
    'Photoshop', 'WordPress', 'SEO', 'Marketing', 'Writing', 'Translation'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Mascot 
          message="What are your superpowers? Show off your skills! ⚡" 
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Your Skills</span>
          </h3>

          <div className="flex space-x-2">
            <motion.input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="button"
              onClick={addSkill}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
              <span>Add</span>
            </motion.button>
          </div>

          {skills.length > 0 && skills[0] && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => skill && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-800 dark:text-primary-200 px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <motion.button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Skills (click to add):</h4>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <motion.button
                  key={skill}
                  type="button"
                  onClick={() => {
                    if (!skills.includes(skill)) {
                      setSkills([...skills, skill]);
                    }
                  }}
                  disabled={skills.includes(skill)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    skills.includes(skill)
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-800 dark:hover:text-primary-200'
                  }`}
                  whileHover={!skills.includes(skill) ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!skills.includes(skill) ? { scale: 0.95 } : {}}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
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
            variant="primary"
            size="lg"
            className="flex-1"
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue to Contact 📞
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  );
};

export default SkillsForm;