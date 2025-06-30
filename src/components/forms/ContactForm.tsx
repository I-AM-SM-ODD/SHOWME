import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Calendar, Linkedin, Github, Globe, Twitter, Instagram, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { ContactInfo, SocialLinks } from '../../types';
import Mascot from '../Mascot';
import AnimatedButton from '../AnimatedButton';

interface ContactFormProps {
  onNext: () => void;
  onBack: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onNext, onBack }) => {
  const { profile, updateProfile } = useProfile();
  const [contactInfo, setContactInfo] = useState<ContactInfo>(profile.contactInfo);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(profile.socialLinks);

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ contactInfo, socialLinks });
    onNext();
  };

  const isValid = contactInfo.email.trim();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Mascot 
          message="How can clients reach you? Let's make it easy for them! 📞" 
          emotion="happy"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4" />
                <span>Email *</span>
              </label>
              <motion.input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </label>
              <motion.input
                type="tel"
                value={contactInfo.whatsapp || ''}
                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Calendly Link (for booking calls)</span>
            </label>
            <motion.input
              type="url"
              value={contactInfo.calendly || ''}
              onChange={(e) => handleContactChange('calendly', e.target.value)}
              placeholder="https://calendly.com/yourname"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.github || ''}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/yourname"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4" />
                <span>Website</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.website || ''}
                onChange={(e) => handleSocialChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yourname"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/yourname"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4" />
                <span>Behance</span>
              </label>
              <motion.input
                type="url"
                value={socialLinks.behance || ''}
                onChange={(e) => handleSocialChange('behance', e.target.value)}
                placeholder="https://behance.net/yourname"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                whileFocus={{ scale: 1.02 }}
              />
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
            disabled={!isValid}
            variant={isValid ? "success" : "secondary"}
            size="lg"
            className="flex-1"
            icon={Sparkles}
            iconPosition="right"
          >
            Generate Portfolio 🎉
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;