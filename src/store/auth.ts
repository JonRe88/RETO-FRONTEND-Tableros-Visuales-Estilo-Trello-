import { create } from 'zustand';
import { AuthStore, User } from '../types';
import toast from 'react-hot-toast';

const USERS_KEY = 'trello_users';
const CURRENT_USER_KEY = 'trello_current_user';

const getStoredUsers = (): Record<string, User> => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getCurrentUser(),
  
  login: (email: string, password: string) => {
    const users = getStoredUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      set({ user });
      toast.success('Welcome back!');
    } else {
      toast.error('Invalid credentials');
    }
  },

  register: (email: string, name: string, password: string) => {
    const users = getStoredUsers();
    
    if (Object.values(users).some(u => u.email === email)) {
      toast.error('Email already registered');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
    };

    users[newUser.id] = newUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    set({ user: newUser });
    toast.success('Registration successful!');
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    set({ user: null });
    toast.success('Logged out successfully');
  },
}));