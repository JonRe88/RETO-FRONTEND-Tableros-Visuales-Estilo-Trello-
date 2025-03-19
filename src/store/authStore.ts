import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        // Get users from localStorage and parse with a default empty array
        const usersStr = localStorage.getItem('users');
        if (!usersStr) return false;
        
        try {
          const users = JSON.parse(usersStr);
          // Ensure users is an array
          if (!Array.isArray(users)) return false;
          
          const user = users.find((u: User) => 
            u.email === email && 
            u.password === password
          );
          
          if (user) {
            set({ user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Error parsing users from localStorage:', error);
          return false;
        }
      },
      register: (email, password) => {
        try {
          // Get existing users or initialize empty array
          const usersStr = localStorage.getItem('users');
          const users = usersStr ? JSON.parse(usersStr) : [];
          
          // Ensure users is an array
          if (!Array.isArray(users)) {
            localStorage.setItem('users', '[]');
            return false;
          }
          
          // Check if email already exists
          if (users.some((u: User) => u.email === email)) {
            return false;
          }
          
          // Create new user
          const newUser = { 
            id: crypto.randomUUID(), 
            email, 
            password 
          };
          
          // Add to users array and save
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          
          // Update state
          set({ user: newUser });
          return true;
        } catch (error) {
          console.error('Error registering user:', error);
          return false;
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);