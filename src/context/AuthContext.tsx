import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserPreferences } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'user' | 'lawyer') => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
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
    const storedUser = localStorage.getItem('lawlite_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'user' | 'lawyer'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
      const foundUser = storedUsers.find((u: User) => u.email === email && u.type === type);
      if (!foundUser) return false;
      setUser(foundUser);
      localStorage.setItem('lawlite_user', JSON.stringify(foundUser));
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (userData.type === 'lawyer' && !userData.licenseNumber) return false;

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        type: userData.type,
        name: userData.name,
        licenseNumber: userData.licenseNumber,
        specialization: userData.specialization,
        experience: userData.experience,
        consultationFee: userData.consultationFee,
        verified: userData.type === 'lawyer' ? false : true,
        rating: 0,
        reviews: [],
        preferences: {
          selectedState: userData.selectedState,
          preferredLanguage: userData.preferredLanguage,
          legalHelpType: userData.legalHelpType,
        },
      };

      const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
      storedUsers.push(newUser);
      localStorage.setItem('lawlite_users', JSON.stringify(storedUsers));
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...prefs },
    };
    setUser(updatedUser);
    localStorage.setItem('lawlite_user', JSON.stringify(updatedUser));

    // Also update in users list
    const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
    const idx = storedUsers.findIndex((u: User) => u.id === user.id);
    if (idx !== -1) {
      storedUsers[idx] = updatedUser;
      localStorage.setItem('lawlite_users', JSON.stringify(storedUsers));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lawlite_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePreferences, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
