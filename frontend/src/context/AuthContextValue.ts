import { createContext } from "react";
import type { User } from "@/api/services/userService";

export interface UserProfile {
  sub: string;
  email?: string;
  roles?: string[];
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  profile: User | null;
  isAuth: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasSpunWheelToday: boolean;
  login: (token: string, refreshToken?: string) => Promise<void>;
  logout: () => void;
  refreshWheelSpinStatus: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  markWheelSpinDone: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
