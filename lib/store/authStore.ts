import { create } from 'zustand';
import { loginUser, logoutUser } from '../api/clientApi';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean; 
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  setLoading: (state: boolean) => void;
  initAuth: () => Promise<void>; 
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  },

  clearIsAuthenticated: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('authUser');
  },

  login: async (email: string, password: string): Promise<boolean> => {
    try {
      set({ loading: true });
      const userData = await loginUser({ email, password });

      set({
        user: userData,
        isAuthenticated: true,
        loading: false,
      });

      localStorage.setItem('authUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
      localStorage.removeItem('authUser');
    }
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  initAuth: async () => {
    try {
      const stored = localStorage.getItem('authUser');
      if (stored) {
        const parsed: User = JSON.parse(stored);
        set({ user: parsed, isAuthenticated: true });
      }
    } catch (err) {
      console.error('Failed to restore auth:', err);
    } finally {
      set({ initialized: true });
    }
  },
}));
