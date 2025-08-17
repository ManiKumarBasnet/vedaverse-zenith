import React, { createContext, useContext, ReactNode } from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import { useToast } from '../hooks/use-toast';

interface AppContextType {
  userProgress: ReturnType<typeof useUserProgress>;
  showToast: ReturnType<typeof useToast>['toast'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const userProgress = useUserProgress();
  const { toast } = useToast();

  const value = {
    userProgress,
    showToast: toast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}