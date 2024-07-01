import { create } from "zustand";
import { AuthUser } from "../_types/auth";

interface AuthState {
  user: AuthUser | null;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  // user: null,
  user: {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    email_verified_at: Date.now().toString(),
  },
  loginUser: (user: AuthUser) => set(() => ({ user })),
  logoutUser: () => set(() => ({ user: null })),
}));

export { useAuthStore };