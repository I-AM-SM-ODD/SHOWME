import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Upload, X, ArrowRight } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import Mascot from '../Mascot';
import AnimatedButton from '../AnimatedButton';

interface BasicInfoFormProps {
  onNext: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext }) => {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [video, setVideo] = useState(profile.video);
  const [resume, setResume] = useState(profile.resume);

  const handleFileUpload = (type: 'image' | 'video' | 'resume', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'image') setProfileImage(result);
      else if (type === 'video') setVideo(result);
      else if (type === 'resume') setResume(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, bio, profileImage, video, resume });
    onNext();
  };

  const isValid = name.trim() && bio.trim();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Mascot 
          message="Tell me about yourself! This is where the magic begins ✨" 
          emotion="thinking"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4" />
              <span>Your Name *</span>
            </label>
            <motion.input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              <span>About You *</span>
            </label>
            <motion.textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I'm a passionate freelancer who loves creating amazing experiences..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Profile Photo Upload */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('image', e.target.files[0])}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-primary-400"
                >
                  {profileImage ? (
                    <div className="relative w-full h-full">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setProfileImage(undefined);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      </motion.div>
                      <span className="text-sm text-gray-500">Upload Photo</span>
                    </>
                  )}
                </label>
              </div>
            </motion.div>

            {/* Video Upload */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intro Video
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('video', e.target.files[0])}
                  className="hidden"
                  id="intro-video"
                />
                <label
                  htmlFor="intro-video"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-primary-400"
                >
                  {video ? (
                    <div className="relative w-full h-full">
                      <video src={video} className="w-full h-full object-cover rounded-xl" />
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setVideo(undefined);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      </motion.div>
                      <span className="text-sm text-gray-500">Upload Video</span>
                    </>
                  )}
                </label>
              </div>
            </motion.div>

            {/* Resume Upload */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resume/CV
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('resume', e.target.files[0])}
                  className="hidden"
                  id="resume"
                />
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-primary-400"
                >
                  {resume ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <FileText className="w-8 h-8 text-primary-500 mb-2" />
                      <span className="text-xs text-center text-gray-600">Resume Uploaded</span>
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setResume(undefined);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      </motion.div>
                      <span className="text-sm text-gray-500">Upload Resume</span>
                    </>
                  )}
                </label>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatedButton
          type="submit"
          disabled={!isValid}
          variant={isValid ? "primary" : "secondary"}
          size="lg"
          className="w-full"
          icon={ArrowRight}
          iconPosition="right"
        >
          Continue to Services 🚀
        </AnimatedButton>
      </form>
    </motion.div>
  );
};

export default BasicInfoForm;