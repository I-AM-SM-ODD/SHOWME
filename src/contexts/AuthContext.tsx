import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: { name: string; email: string; password: string }) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('showme_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      username: email.split('@')[0],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    };
    
    setUser(mockUser);
    localStorage.setItem('showme_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signUp = async (userData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      username: userData.email.split('@')[0],
    };
    
    setUser(newUser);
    localStorage.setItem('showme_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('showme_user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};