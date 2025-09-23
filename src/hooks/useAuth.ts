import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: FirebaseAuthTypes.User | undefined;
  userLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
