import { createContext, useContext } from "react";

import {
  useLogin,
  useLogout,
  useSignup,
  useUser,
} from "../features/Auth/useAuth";
import type { User } from "@supabase/supabase-js";

type AuthContextValue = {
  user: User | null | undefined;
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  signup: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const { login } = useLogin();
  const { user, isAuthenticated } = useUser();
  const { signup } = useSignup();
  const { logout } = useLogout();

  const contextValue = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
