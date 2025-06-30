import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types';

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  bio: '',
  services: [],
  skills: [],
  socialLinks: {},
  contactInfo: { email: '' },
  testimonials: []
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};