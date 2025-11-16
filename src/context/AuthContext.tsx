import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'user' | 'lawyer') => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
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
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('lawlite_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'user' | 'lawyer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - In real app, this would be actual authentication
    try {
      // Check stored users (mock authentication)
      const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
      const foundUser = storedUsers.find((u: User) => 
        u.email === email && u.type === type
      );
      
      if (!foundUser) {
        return false;
      }
      
      // In real app, verify password hash
      // For demo, we'll assume login is successful if user exists
      
      setUser(foundUser);
      localStorage.setItem('lawlite_user', JSON.stringify(foundUser));
      return true;
    } catch (error) {
      // Error logged server-side only in production
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Validate lawyer license if signing up as lawyer
      if (userData.type === 'lawyer' && !userData.licenseNumber) {
        return false;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        type: userData.type,
        name: userData.name,
        state: userData.state,
        preferredLanguage: userData.preferredLanguage || 'en',
        licenseNumber: userData.licenseNumber,
        specialization: userData.specialization,
        experience: userData.experience,
        consultationFee: userData.consultationFee,
        verified: userData.type === 'lawyer' ? false : true, // Lawyers need manual verification
        rating: 0,
        reviews: []
      };
      
      // Store user in localStorage (in real app, this would be API call)
      const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
      storedUsers.push(newUser);
      localStorage.setItem('lawlite_users', JSON.stringify(storedUsers));
      
      return true;
    } catch (error) {
      // Error logged server-side only in production
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lawlite_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};